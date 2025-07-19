import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import sizeOf from 'image-size';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  findAll(archive: boolean = false): Promise<Wish[]> {
    return this.wishRepository.find({
      where: {
        disabled: archive,
      },
      order: {
        order: 'DESC',
        created_at: 'DESC',
      },
    });
  }

  findOne(id: string): Promise<Wish | null> {
    return this.wishRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.wishRepository.delete(id);
  }

  async create(createWishDto: CreateWishDto) {
    const wish = this.wishRepository.create(createWishDto);
    return this.wishRepository.save(wish);
  }

  async update(id: string, updateWishDto: UpdateWishDto) {
    const wish = await this.wishRepository.preload({
      id: id,
      ...updateWishDto,
    });
    if (!wish) {
      throw new NotFoundException(`Wish #${id} not found`);
    }
    return this.wishRepository.save(wish);
  }

  public async findMetaFromURl(url: string) {
    try {
      const response: AxiosResponse<string> = await axios.get(url, {
        headers: {
          'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
          'user-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          accept: '*/*',
          'x-requested-with': 'XMLHttpRequest',
        },
        // Follow up to 5 redirects
        maxRedirects: 5,
      });

      const html = response.data;
      const $ = cheerio.load(html);

      let title =
        $('meta[property="og:title"]').attr('content') ||
        $('title').text() ||
        undefined;
      title = this.limitStringLength(title || '', 50);

      let description =
        $('meta[name="description"]').attr('content') ||
        $('meta[property="og:description"]').attr('content') ||
        undefined;
      description = this.limitStringLength(description || '', 70);

      let image =
        $('meta[property="og:image"]').attr('content') ||
        $('meta[name="twitter:image"]').attr('content') ||
        undefined;

      if (!image) {
        let images = $('img')
          .map((i, el) => $(el).attr('src'))
          .get();

        images = images.map((img) => {
          const base = new URL(url);
          const resolvedImage = image ? new URL(img, base).href : undefined;

          return resolvedImage || img;
        });

        const largestImage = await this.findMainPicture(images);

        if (largestImage) {
          image = largestImage;
        }
      }

      if (image) {
        const base = new URL(url);
        const resolvedImage = image ? new URL(image, base).href : undefined;
        image = resolvedImage;
      }

      return {
        title: title,
        description: description,
        picture: image,
      };
    } catch {
      console.error('Error fetching URL:');
    }
  }

  /**
   * Limits the length of a string to a specified maximum length
   * Break the string at the last space before the limit
   *
   * @param str
   * @param maxLength
   */
  limitStringLength(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    }

    // Find the last space before the max length
    const lastSpaceIndex = str.lastIndexOf(' ', maxLength);
    if (lastSpaceIndex === -1) {
      // No space found, truncate at max length
      return str.slice(0, maxLength) + '...';
    }

    // Return the string up to the last space
    return str.slice(0, lastSpaceIndex) + '...';
  }

  async findMainPicture(images: string[]): Promise<null | string> {
    // Size threshold for "main" image
    const MIN_WIDTH = 1000;
    const MIN_HEIGHT = 1000;

    let largestImage: { url: string; area: number } | null = null;

    for (const url of images) {
      try {
        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          timeout: 7000,
        });
        const buffer = Buffer.from(response.data);

        const { width, height } = sizeOf(buffer);

        if (width && height && width > 0 && height > 0) {
          const area = width * height;

          // ✅ First image that meets size requirements
          if (width >= MIN_WIDTH && height >= MIN_HEIGHT) {
            return url;
          }

          // 🧠 Track largest image seen so far (if nothing satisfied the size threshold)
          if (!largestImage || area > largestImage.area) {
            largestImage = { url, area };
          }
        }
      } catch {
        // skip broken or unresponsive images
        continue;
      }
    }

    // ❌ No big image found - return largest fallback
    return largestImage?.url ?? null;
  }

  async findLargestImage(images: string[]): Promise<null | string> {
    const results: {
      url: string;
      width: number;
      height: number;
      area: number;
    }[] = [];
    for (const url of images) {
      try {
        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          timeout: 7000,
        });
        const buffer = Buffer.from(response.data);

        const { width, height } = sizeOf(buffer);
        if (width && height && width > 0 && height > 0) {
          results.push({
            url,
            width,
            height,
            area: width * height,
          });
        }
      } catch {
        // skip images that fail to load or parse
        continue;
      }
    }

    if (results.length === 0) {
      return null;
    }

    // Find the image with the largest area
    return results.reduce(
      (max, curr) => (curr.area > max.area ? curr : max),
      results[0],
    ).url;
  }

  async getImageDimensions(
    url: string,
  ): Promise<{ width: number; height: number }> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const { width, height } = sizeOf(buffer);
    return { width, height };
  }
}

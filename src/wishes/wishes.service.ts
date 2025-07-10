import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
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
}

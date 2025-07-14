import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';
import { CreateWishDto } from './dto/create-wish.dto';
import { Public } from '../global/decorators/public.decorator';

@Controller('wishes')
@ApiTags('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get()
  @Public()
  getAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @Get('archive')
  @ApiBearerAuth()
  getArchive(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async getOne(
    @Param('id')
    id: string,
  ): Promise<Wish> {
    const wish = await this.wishesService.findOne(id);
    if (!wish) {
      throw new NotFoundException(`Wish with id ${id} not found`);
    }
    return wish;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The uuid of the user',
  })
  update(
    @Param('id')
    id: string,
    @Body()
    updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.update(id, updateWishDto);
  }

  @Post()
  @ApiBearerAuth()
  async create(
    @Body()
    createWishDto: CreateWishDto,
  ) {
    return this.wishesService.create(createWishDto);
  }
}

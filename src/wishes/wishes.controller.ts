import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

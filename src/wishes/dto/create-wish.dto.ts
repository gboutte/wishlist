import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateWishDto {
  @ApiProperty({
    description: 'The title',
    example: 'A tesla',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'The link to the product',
    example: 'https://www.tesla.com/model3',
  })
  @IsString()
  readonly link: string;

  @ApiProperty({
    description: 'The description of the wish',
    example: 'I would like to have a Tesla Model 3',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'The price of the wish',
    example: 35000,
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'The order of the wish',
    example: 1,
  })
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  readonly order: number;

  @ApiProperty({
    description: 'Whether the wish is disabled',
    example: false,
  })
  @IsBoolean()
  readonly disabled: boolean;
}

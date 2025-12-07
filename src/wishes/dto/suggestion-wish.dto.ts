import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SuggestionWishDto {
  @ApiProperty({
    description: 'The link to the product',
    example: 'https://www.tesla.com/model3',
  })
  @IsString()
  readonly link: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateConfigDto {
  @ApiProperty({
    description: 'The name to show.',
    example: 'John Doe',
  })
  @IsString()
  readonly name: string;
  @ApiProperty({
    description: 'The description.',
    example: 'Bla Bla',
  })
  @IsString()
  readonly description: string;
}

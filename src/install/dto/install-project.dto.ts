import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InstallProjectDto {
  @ApiProperty({
    description: 'The username of the new user',
    example: 'admin',
  })
  @IsString()
  readonly username: string;
  @ApiProperty({
    description: 'The password of the new user.',
    example: 'P@$$w0rd',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'The name.',
    example: 'John Doe',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The name.',
    example: 'Blah blah blah',
  })
  @IsString()
  readonly description: string;
}

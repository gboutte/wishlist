import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Install } from '../global/decorators/install.decorator';
import { UsersService } from '../users/users.service';
import { InstallProjectDto } from './dto/install-project.dto';
import { ConfigService } from '../config/config.service';

@Controller('install')
@ApiTags('install')
export class InstallController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @Install()
  async register(@Body() installProjectDto: InstallProjectDto) {
    const user = await this.usersService.create({
      username: installProjectDto.username,
      password: installProjectDto.password,
    });

    let configName = await this.configService.findOne('name');

    if (!configName) {
      configName = await this.configService.save({
        code: 'name',
        value: installProjectDto.name,
      });
    } else {
      configName.value = installProjectDto.name;
      await this.configService.save(configName);
    }

    let configDescription = await this.configService.findOne('description');

    if (!configDescription) {
      configDescription = await this.configService.save({
        code: 'description',
        value: installProjectDto.description,
      });
    } else {
      configDescription.value = installProjectDto.description;
      await this.configService.save(configDescription);
    }

    return user;
  }
}

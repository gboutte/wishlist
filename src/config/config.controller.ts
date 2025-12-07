import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../global/decorators/public.decorator';
import { ConfigService } from './config.service';
import { UpdateConfigDto } from './dto/update-config.dto';

@Controller('config')
@ApiTags('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('project')
  @Public()
  async getStatus() {
    const status = await this.configService.findAll();

    let name = '';
    let description = '';

    for (const config of status) {
      if (config.code === 'name') {
        name = config.value;
      } else if (config.code === 'description') {
        description = config.value;
      }
    }

    return {
      name: name,
      description: description,
    };
  }
  @Post('project')
  @Public()
  async updateStatus(
    @Body()
    updateConfigDto: UpdateConfigDto,
  ) {
    const name = await this.configService.findOne('name');
    const description = await this.configService.findOne('description');

    if (name === null || description === null) {
      throw new Error('Configuration not found');
    }

    name.value = updateConfigDto.name;
    description.value = updateConfigDto.description;

    await this.configService.save(name);
    await this.configService.save(description);

    return {
      name: name,
      description: description,
    };
  }
}

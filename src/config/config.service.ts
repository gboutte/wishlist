import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
  ) {}

  async save(config: Config) {
    return await this.configRepository.save(config);
  }

  findAll(): Promise<Config[]> {
    return this.configRepository.find();
  }

  findOne(code: string): Promise<Config | null> {
    return this.configRepository.findOne({ where: { code: code } });
  }
}

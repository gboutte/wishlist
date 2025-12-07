import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { InstallController } from './install.controller';
import { ConfigProjectModule } from '../config/config-project.module';

@Module({
  imports: [UsersModule, ConfigProjectModule],
  controllers: [InstallController],
})
export class InstallModule {}

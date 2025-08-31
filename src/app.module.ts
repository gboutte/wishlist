import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallModule } from './install/install.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { InstalledJwtGuard } from './global/guards/installed-jwt.guard';
import { WishesModule } from './wishes/wishes.module';
import { StatusModule } from './status/status.module';
import { ConfigProjectModule } from './config/config-project.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist/client/browser'),
    }),
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST:  Joi.required(),
        APP_MODE: Joi.valid('dev', 'prod').required(),
        DATABASE_USER: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        DATABASE_NAME: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        APP_SECRET: Joi.required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    InstallModule,
    AuthModule,
    WishesModule,
    StatusModule,
    ConfigProjectModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: InstalledJwtGuard,
    },
  ],
})
export class AppModule {}

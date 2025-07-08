import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Every property that is not in the DTO will be removed
      forbidNonWhitelisted: true, // If a property is not in the DTO an error will be thrown because it is not allowed
      transform: true, // Transform the payload into the DTO class, without this option the payload will be a simple object with the shape of the DTO class but won't be an instance of the DTO class.
      transformOptions: {
        enableImplicitConversion: true, // Convert the type primitive type like number and boolean to the right type without having to specify it with @Type decorator
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      filter: true,
      syntaxHighlight: {
        activate: true,
        theme: 'tomorrow-night',
      },
      tryItOutEnabled: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

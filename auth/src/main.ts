/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth System')
    .setDescription('The auth system for a e-commerce library')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get<number>('PORT');
  const HOST = configService.get<number>('HOST');

  await app.listen(PORT, () =>
    console.warn(`Server running in ${HOST}:${PORT}`),
  );
}

bootstrap();

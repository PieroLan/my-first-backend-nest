import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/env/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita las validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(envs.PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${envs.PORT}}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {envs} from './config/env/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${envs.PORT}}`,
  );
}
bootstrap();

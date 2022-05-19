import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  Logger,
} from '@nestjs/common';

import { ServerConfigType } from './interfaces/server-config-type.interface';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const config = configService.get<ServerConfigType>('server');
  
  await app.listen(config.port, () => {
    Logger.log(`🚀 Listening on port ${config.port}`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { getAppOptions } from './config/config';

async function bootstrap() {
  const appOptions = getAppOptions();
  const app = await NestFactory.create(AppModule, appOptions);

  const configService = app.get(ConfigService);
  const globalPrefix = configService.get('globalPrefix');
  const port = configService.get('port');

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config, { envFilePath } from './config/config';
import { getMongoConfig } from './config/mongo.config';

import { WorkTimeModule } from './work-time/work-time.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    WorkTimeModule,
    StatisticsModule,
  ],
})
export class AppModule {}

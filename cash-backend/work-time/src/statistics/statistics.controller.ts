import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  Version,
} from '@nestjs/common';
import { Response } from 'express';

import { StatisticsService } from './statistics.service';
import { RangeDto } from '../dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Version('1')
  @Get('/work-time')
  async getWorkTimeStatistics(@Query() dto: RangeDto, @Res() res: Response) {
    const storages = await this.statisticsService.getWorkTimeStatistics(dto);
    return res.status(HttpStatus.OK).send(storages);
  }
}

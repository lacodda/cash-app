import * as $R from 'ramda';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RangeDto } from '../dto';

import { WorkTimeService } from '../work-time/work-time.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly workTimeService: WorkTimeService) {}

  async getWorkTimeStatistics(dto: RangeDto) {
    try {
      const getTimeSum = $R.pipe($R.map($R.prop('time')), $R.sum);
      const { data } = await this.workTimeService.findAll(dto);
      const timeSum = getTimeSum(data);
      return {
        timeSum,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

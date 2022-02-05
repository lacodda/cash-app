import http from '@/http-client';
import { Dates } from '@/helpers';
import * as R from 'ramda';

/* eslint-disable */
class StatisticsService {
  async getWorkTime(fetchParams: IFetchParams): Promise<any> {
    const params = R.mapObjIndexed(Dates.formatISO, fetchParams);   
    return http.get(`/v1/statistics/work-time`, { params });
  }
}

export default new StatisticsService();

import * as R from 'ramda';
import http from '@/http-client';
import { Dates } from '@/helpers';

/* eslint-disable */
class WorkTimeService {
  async getAll(fetchParams: IFetchParams): Promise<any> {
    const params = R.mapObjIndexed(Dates.formatISO, fetchParams);
    return http.get(`/v1/work-time`, { params });
  }

  async get(id: string): Promise<any> {
    return http.get(`/v1/work-time/${id}`);
  }

  async create(dayData: IDayData): Promise<any> {
    const data = { ...dayData, date: Dates.formatISO(dayData.date) };
    return http.post(`/v1/work-time`, data);
  }

  async update(id: any, dayData: IDayData): Promise<any> {
    const data = { ...dayData, date: Dates.formatISO(dayData.date) };
    return http.patch(`/v1/work-time/${id}`, data);
  }

  async delete(id: any): Promise<any> {
    return http.delete(`/v1/work-time/${id}`);
  }
}

export default new WorkTimeService();

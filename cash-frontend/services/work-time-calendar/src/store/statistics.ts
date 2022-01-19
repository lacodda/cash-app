import { ActionContext } from 'vuex';
import StatisticsService from '@/services/StatisticsService';
import { IDayData, IFetchParams } from '@/models/calendar.model';

export const types = {
  SET_WORK_TIME: 'SET_WORK_TIME',
  SET_LOADING: 'SET_LOADING',
};

export default {
  state() {
    return {
      workTime: {},
      loading: {
        workTime: false,
      },
    };
  },
  getters: {},
  actions: {
    async fetchWorkTime(
      { commit }: ActionContext<any, any>,
      params: IFetchParams,
    ) {
      commit(types.SET_LOADING, { workTime: true });

      const data = propOr(
        {},
        'data',
        await StatisticsService.getWorkTime(params),
      );

      commit(types.SET_WORK_TIME, data);
      commit(types.SET_LOADING, { workTime: false });
    },
  },
  mutations: {
    [types.SET_WORK_TIME](state: any, payload: any) {
      state.workTime = payload;
    },
    [types.SET_LOADING](state: any, payload: any) {
      const data = mergeDeepRight(state.loading, payload);
      state.loading = data;
    },
  },
  namespaced: true,
};

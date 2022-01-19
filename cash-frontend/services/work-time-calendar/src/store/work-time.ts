import { ActionContext } from 'vuex';
import WorkTimeService from '@/services/WorkTimeService';
import { IDayData, IFetchParams } from '@/models/calendar.model';

export const types = {
  SET_WORK_TIME_DATA: 'SET_WORK_TIME_DATA',
  SET_LOADING: 'SET_LOADING',
};

export default {
  state() {
    return {
      data: [],
      loading: {
        data: false,
      },
    };
  },
  getters: {},
  actions: {
    async fetch({ commit }: ActionContext<any, any>, params: IFetchParams) {
      commit(types.SET_LOADING, { data: true });

      const data = pathOr(
        [],
        ['data', 'data'],
        await WorkTimeService.getAll(params),
      );

      commit(types.SET_WORK_TIME_DATA, data);
      commit(types.SET_LOADING, { data: false });
    },

    async createOrUpdate(
      { commit }: ActionContext<any, any>,
      dayData: IDayData,
    ) {
      commit(types.SET_LOADING, { data: true });
      if (dayData._id) {
        await WorkTimeService.update(dayData._id, dayData);
      } else {
        await WorkTimeService.create(dayData);
      }
      commit(types.SET_LOADING, { data: false });
    },

    async delete({ commit }: ActionContext<any, any>, dayData: IDayData) {
      commit(types.SET_LOADING, { data: true });
      await WorkTimeService.delete(dayData._id);
      commit(types.SET_LOADING, { data: false });
    },
  },
  mutations: {
    [types.SET_WORK_TIME_DATA](state: any, payload: any) {
      state.data = payload;
    },
    [types.SET_LOADING](state: any, payload: any) {
      const data = mergeDeepRight(state.loading, payload);
      state.loading = data;
    },
  },
  namespaced: true,
};

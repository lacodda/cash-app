<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <calendar
        v-loading="loadingData"
        :data="data"
        @save="save"
        @remove="remove"
        @selectMonth="selectMonth"
    /></el-col>
    <el-col :span="8">
      <work-time-statistics
        v-loading="loadingStatisticsWorkTime"
        :data="statisticsWorkTime"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { IDayData, IFetchParams } from '@/models/calendar.model';

export default defineComponent({
  setup() {
    const store = useStore();
    const data = computed(() => store.state.workTime.data);
    const loadingData = computed(() => store.state.workTime.loading.data);
    const statisticsWorkTime = computed(() => store.state.statistics.workTime);
    const loadingStatisticsWorkTime = computed(
      () => store.state.statistics.loading.workTime
    );
    const savedParams = ref({});

    async function selectMonth(params: IFetchParams) {
      savedParams.value = params;
      store.dispatch('workTime/fetch', params);
      store.dispatch('statistics/fetchWorkTime', params);
    }

    async function save(dayData: IDayData): Promise<void> {
      await store.dispatch('workTime/createOrUpdate', dayData);
      await store.dispatch('workTime/fetch', savedParams.value);
    }

    async function remove(dayData: IDayData): Promise<void> {
      if (!dayData._id) {
        return;
      }
      await store.dispatch('workTime/delete', dayData);
      await store.dispatch('workTime/fetch', savedParams.value);
    }

    return {
      data,
      loadingData,
      statisticsWorkTime,
      loadingStatisticsWorkTime,
      selectMonth,
      save,
      remove,
    };
  },
});
</script>
<style lang="scss" scoped></style>

<template>
  <el-card shadow="never" class="statistics__card">
    <template #header>
      <div class="card-header">
        <span>Total</span>
        <!-- <el-button class="button" type="text">Operation button</el-button> -->
      </div>
    </template>
    <div class="statistics__body">
      {{ statistics.timeSum }}
    </div>
  </el-card>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { secondsToHours } from 'date-fns/fp';

interface IWorkTimeStatistics {
  timeSum: number;
}

function transformData(statistics: IWorkTimeStatistics) {
  return {
    timeSum: secondsToHours(statistics.timeSum),
  };
}

export default defineComponent({
  name: 'WorkTimeStatistics',

  props: {
    data: {
      type: Object as PropType<IWorkTimeStatistics>,
    },
  },

  setup(props) {
    const statistics = computed(() => transformData(props.data));

    return { statistics };
  },
});
</script>
<style lang="scss" scoped>
.statistics {
  &__card {
    height: 100%;
  }
}
</style>

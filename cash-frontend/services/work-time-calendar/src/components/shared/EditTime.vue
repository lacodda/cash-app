<template>
  <el-popover placement="bottom" :width="160" v-model:visible="visible"
    ><div class="popover">
      <div class="popover__header">Time</div>
      <div class="popover__body">
        <el-time-picker
          v-model="time"
          placeholder="Time"
          :disabled-seconds="disabledSeconds"
        />
      </div>
      <div class="popover__footer">
        <el-button size="mini" type="text" @click="visible = false"
          >cancel</el-button
        >
        <el-button type="primary" size="mini" @click="save">confirm</el-button>
      </div>
    </div>
    <template #reference>
      <transition name="fade">
        <el-button
          v-show="show || visible"
          size="mini"
          circle
          @click="visible = true"
        >
          <i-carbon-edit />
        </el-button>
      </transition>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { startOfDay } from 'date-fns/fp';
import { IDayData } from '@/models/calendar.model';

export default defineComponent({
  name: 'EditTime',

  props: {
    dayData: {
      type: Object as PropType<IDayData>,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    defaultTime: {
      type: Date,
    },
  },

  emits: ['save'],

  setup(props, { emit }) {
    const visible = ref(false);
    const time_ = ref(undefined);

    const time = computed({
      get: () => time_.value,
      set: (val) => {
        time_.value = when(isNil, always(startOfDay(new Date())))(val);
      },
    });

    watch(
      () => clone(props),
      () => {
        time_.value = props.dayData.time || props.defaultTime;
      }
    );

    function save(): void {
      emit('save', { ...props.dayData, time: time.value });
      visible.value = false;
    }

    function disabledSeconds() {
      return times(identity, 60);
    }

    return {
      visible,
      time,
      save,
      disabledSeconds,
    };
  },
});
</script>

<style lang="scss">
.popover {
  display: grid;
  gap: 12px;
  &__header {
  }
  &__body {
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
.el-date-editor {
  --el-date-editor-width: auto;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>

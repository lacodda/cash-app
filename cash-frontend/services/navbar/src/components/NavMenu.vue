<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu__navmenu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, key) in menu"
        :key="key"
        :index="item.index"
        >{{ item.label }}</el-menu-item
      >
    </el-menu>
  </el-header>
</template>

<script lang="ts">
import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import * as R from 'ramda';
import { routes } from '@/router';

export default defineComponent({
  name: 'NavMenu',

  setup() {
    const { t } = useI18n();

    const activeIndex = ref('');
    const router = useRouter();
    const route = useRoute();

    const menu: Array<any> = R.map(
      ({ name }: RouteRecordRaw) => ({
        index: name as string,
        label: t(`menu.${name as string}`),
      }),
      routes
    );

    watch(route, ({ name }: RouteLocationNormalizedLoaded) => {
      activeIndex.value = name as string;
    });

    const handleSelect = (name: string) => {
      router.push({ name });
    };

    return {
      menu,
      activeIndex,
      handleSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu {
  &__navmenu {
    user-select: none;
  }
}
</style>

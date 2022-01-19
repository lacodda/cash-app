<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu__navmenu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, key) in routes"
        :key="key"
        :index="item.name"
        >{{ translate(item.name) }}</el-menu-item
      >
    </el-menu>
  </el-header>
</template>

<script lang="ts">
import { routes } from '@/router';

export default defineComponent({
  name: 'NavMenu',

  setup() {
    const { t } = useI18n();

    const activeIndex = ref('');
    const router = useRouter();
    const route = useRoute();

    watch(route, (value) => {
      if (value && find(propEq('name', value.name), routes)) {
        activeIndex.value = value.name.toString();
      }
    });

    const handleSelect = (name: string) => {
      router.push({ name });
    };

    const translate = (term: string) => t(`menu.${term}`);

    return {
      routes,
      activeIndex,
      handleSelect,
      translate,
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

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
        >{{ item.name }}</el-menu-item
      >
    </el-menu>
  </el-header>
</template>

<script lang="ts">
export default defineComponent({
  name: 'NavMenu',

  setup() {
    const { t } = useI18n();

    const menu = [
      { index: 'home', name: t('menu.home') },
      { index: 'calendar', name: t('menu.calendar') },
    ];

    const activeIndex = ref('');
    const router = useRouter();
    const route = useRoute();

    watch(route, (value) => {
      if (value && find(propEq('index', value.name), menu)) {
        activeIndex.value = value.name.toString();
      }
    });

    const handleSelect = (name: string) => {
      router.push({ name });
    };

    return {
      menu,
      activeIndex,
      handleSelect,
      t,
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

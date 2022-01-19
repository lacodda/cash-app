<template>
  <el-scrollbar height="100vh" class="container">
    <nav-menu />
    <el-main>
      <router-view />
    </el-main>
  </el-scrollbar>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Open Sans', sans-serif;
  color: #2c3e50;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.container {
  margin-left: var(--navbar-width);
}
</style>

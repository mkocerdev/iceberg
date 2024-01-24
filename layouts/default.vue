<template>
  <div class="app">
    <div class="app__sidebar">
      <SideBar />
    </div>
    <div class="app__main">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import SideBar from '@/modules/layout/SideBar'

export default {
  components: {
    SideBar,
  },
}
</script>

<style lang="scss" scoped>
.app {
  margin-left: var(--sidebar-width);
  &__sidebar {
    text-align: center;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    background-color: black;
    text-align: center;
  }
  &__main {
    padding: 1rem 2rem;
  }
}
</style>

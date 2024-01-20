<template>
  <div class="app">
    <div class="app__sidebar">
      <Sidebar />
    </div>
    <div class="app__main">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/modules/layout/Sidebar.vue'

export default {
  components: {
    Sidebar,
  },
}
</script>

<style lang="scss" scoped>
.app {
  display: grid;
  grid-template-columns: 250px 2fr;
  &__sidebar {
    background-color: black;
    text-align: center;
  }
  &__main {
    padding: 1rem 2rem;
  }
}
</style>

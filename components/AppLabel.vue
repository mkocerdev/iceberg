<template>
  <label class="app-label"> <slot /> </label>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-label {
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-flex;
  display: flex;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
</style>

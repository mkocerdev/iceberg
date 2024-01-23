<template>
  <button class="app-button" v-bind="$attrs" v-on="$listeners">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.app-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  outline: none;
  border: none;
  border-radius: var(--radius);
  background-color: #000;
  color: #fff;
  padding: 0 1rem;
}
</style>

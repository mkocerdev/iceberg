<template>
  <div class="app-form-input">
    <AppLabel v-if="label">{{ label }}</AppLabel>
    <input
      class="app-form-input__input"
      :value="value"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Object, Array],
      default: null,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.app-form-input {
  display: flex;
  flex-flow: column wrap;
  &__input {
    border-radius: var(--radius);
    outline: none;
    box-shadow: none;
    border: 1px solid #ebecee;
    padding: 0 1rem;
    height: 50px;
    background: #fff;
    &::placeholder {
      font-size: 0.9rem;
    }
  }
}
</style>

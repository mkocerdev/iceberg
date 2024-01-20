<template>
  <div class="app-form-input">
    <label v-if="label" class="app-form-input__label">{{ label }}</label>
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
  &__label {
    -webkit-align-items: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  &__input {
    border-radius: var(--radius);
    outline: none;
    box-shadow: none;
    border: 1px solid #cdcdcd;
    padding: 0 1rem;
    height: 50px;
    background: #fff;
    &::placeholder {
      font-size: 0.9rem;
    }
  }
}
</style>

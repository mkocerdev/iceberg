<template>
  <div class="app-form-select">
    <AppLabel v-if="label">{{ label }}</AppLabel>
    <div
      v-click-outside="closeMenu"
      class="app-form-select__selected"
      @click="menu = !menu"
    >
      <AppFormInput :value="getSelected?.label" readonly v-bind="$attrs" />
      <div class="app-form-select__selected-icon">
        <img :src="require('@/assets/icons/chevron-down-solid.svg')" />
      </div>
    </div>
    <div
      class="app-form-select__menu"
      :class="{ 'app-form-select__menu--active': menu }"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="app-form-select__menu-option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
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
    },
    options: {
      // Array of { label, value } objects
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      menu: false,
      selected: null,
    }
  },
  computed: {
    getSelected() {
      return this.selected
    },
  },
  methods: {
    selectOption(option) {
      this.menu = false
      this.selected = option
      this.$emit('input', option)
    },
    closeMenu() {
      this.menu = false
    },
  },
}
</script>

<style lang="scss" scoped>
.app-form-select {
  position: relative;
  display: flex;
  flex-flow: column wrap;
  &__selected {
    position: relative;
    ::v-deep {
      .app-form-input {
        cursor: pointer;
      }
    }
    &-icon {
      position: absolute;
      right: 20px;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
    }
  }
  &__menu {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background: #fff;
    border-radius: var(--radius);
    border: 1px solid #cdcdcd;
    cursor: pointer;
    max-height: 240px;
    overflow-x: scroll;
    &-option {
      padding: 1rem;
      border-bottom: 1px solid #cdcdcd;
      font-size: 0.9rem;
      &:hover {
        background-color: #f4f4f4;
      }
    }
    &--active {
      display: block;
    }
  }
}
</style>

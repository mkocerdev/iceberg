<template>
  <div class="app-form-select">
    <AppLabel v-if="label">{{ label }}</AppLabel>
    <div
      v-click-outside="closeMenu"
      class="app-form-select__selected"
      @click="menu = !menu"
    >
      <AppFormInput
        :value="getSelected?.label"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <div class="app-form-select__selected-icon">
        <AppIcon name="chevron-down" width="10px" />
      </div>
      <button
        v-if="getSelected"
        class="app-form-select__selected-reset"
        @click="resetOption"
      >
        <AppIcon name="circle-xmark" width="10px" />
      </button>
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
        {{ option?.label }}
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
      selected: this.value || null,
    }
  },
  computed: {
    getSelected() {
      return this.value
        ? this.options.find((item) => item.value === this.value)
        : this.selected
    },
  },
  methods: {
    resetOption(e) {
      e.preventDefault()
      this.selected = null
      this.$emit('input', null)
    },
    selectOption(option) {
      this.menu = false
      this.selected = option.value
      this.$emit('input', option.value)
    },
    closeMenu() {
      this.menu = false
    },
  },
}
</script>

<style lang="scss" scoped>
.app-form-select {
  cursor: pointer;
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
    &-reset {
      border: 0;
      background-color: #fff;
      position: absolute;
      right: 25px;
      top: 1px;
      bottom: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      cursor: pointer;
    }
    &-icon {
      position: absolute;
      right: 15px;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
    }
  }
  &__menu {
    z-index: 3;
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% - 4px);
    background: #fff;
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    border: 1px solid #ebecee;
    cursor: pointer;
    max-height: 240px;
    overflow-x: scroll;
    &-option {
      padding: 1rem;
      border-bottom: 1px solid #ebecee;
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

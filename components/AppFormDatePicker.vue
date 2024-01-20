<template>
  <div class="app-form-datepicker">
    <label v-if="label" class="app-form-datepicker__label">{{ label }}</label>
    <div class="app-form-datepicker__date">
      <date-picker v-bind="$attrs" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  events: ['input'],
  components: { DatePicker },
  props: {
    label: {
      type: String,
      default: '',
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
      return this.selected || this.options[0]
    },
  },
  methods: {
    selectOption(option) {
      this.menu = false
      this.selected = option
    },
  },
}
</script>

<style lang="scss" scoped>
.app-form-datepicker {
  position: relative;
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
  &__date {
    cursor: pointer;
  }
}
.mx-datepicker {
  width: 100%;
  ::v-deep {
    .mx-input {
      border-radius: var(--radius);
      outline: none;
      box-shadow: none;
      border: 1px solid #cdcdcd;
      padding: 0 1rem;
      height: 50px;
      background: #fff;
    }
  }
}
</style>

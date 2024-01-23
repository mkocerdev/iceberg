<template>
  <div>
    <component :is="name" role="img" v-bind="$attrs" />
  </div>
</template>

<script>
import iconChevronDown from './icons/icon-chevron-down.vue'
import iconCircleDot from './icons/icon-circle-dot.vue'
import iconLocationDot from './icons/icon-location-dot.vue'

export default {
  components: {
    'chevron-down': iconChevronDown,
    'circle-dot': iconCircleDot,
    'location-dot': iconLocationDot,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

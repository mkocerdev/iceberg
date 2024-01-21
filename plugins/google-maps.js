import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
export default ({ env }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: env.googleMapKey,
      libraries: 'places',
    },
  })
}

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAWpu39GOmptRokQPo1abUGeF1k2epu7wA',
    libraries: 'places',
  },
})

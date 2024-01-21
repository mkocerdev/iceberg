<template>
  <div>
    <div v-if="date && direction">
      <AppLabel>Randevu Hesaplamaları</AppLabel>
      <div>
        <AppLabel> Adrese olan mesafe: </AppLabel>
        <p>{{ getDistanceToDestination }}</p>
      </div>
      <div>
        <AppLabel> Adrese olan süre: </AppLabel>
        <p>{{ getDurationToDestination }}</p>
      </div>
      <div>
        <AppLabel> Tahimini ofisten çıkış zamanı: </AppLabel>
        <p>
          {{ getEstimatedTimeToOutOfOffice | formatDate }}
        </p>
      </div>
      <div>
        <AppLabel>
          Randevu Sonrası Ofise dönüş tahmini (Randevu süresi 1 saat olarak
          hesaplanmıştır):
        </AppLabel>
        <p>{{ getEstimatedTimeBackToOffice | formatDate }}</p>
      </div>
    </div>
    <div>
      <AppLabel>Randevu Adresi</AppLabel>
      <GmapMap
        ref="map"
        :center="center"
        :zoom="8"
        style="width: 100%; height: 400px"
        @click="selectDestination"
      >
        <DirectionsRenderer
          :origin="origin?.position"
          :destination="destination?.position"
          travel-mode="DRIVING"
          @get-direction="getDirection"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import DirectionsRenderer from './DirectionsRenderer'
export default {
  components: {
    DirectionsRenderer,
  },
  props: {
    postcode: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {
      // map center position
      center: { lat: 51.7291573, lng: 0.4780267 },
      // Office location
      origin: {
        position: { lat: 51.7291573, lng: 0.4780267 },
      },
      // Destination Location
      destination: null,
      direction: null,
    }
  },
  computed: {
    getDistanceToDestination() {
      return this.direction.routes[0].legs[0].distance.text
    },
    getDurationToDestination() {
      return this.direction.routes[0].legs[0].duration.text
    },
    getEstimatedTimeToOutOfOffice() {
      const date = new Date(this.date)
      const duration = this.direction.routes[0].legs[0].duration.value
      return this.subtractSeconds(date, duration)
    },
    getEstimatedTimeBackToOffice() {
      const date = new Date(this.date)
      const duration = this.direction.routes[0].legs[0].duration.value

      // duration * add back to office + 1 hour default appoinment time
      const totalTime = duration * 2 + 3600

      return this.addSeconds(date, totalTime)
    },
  },
  methods: {
    selectDestination(event) {
      const marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      this.destination = { position: marker }
      this.getPostCodeByPosition(this.destination)
    },
    async getPostCodeByPosition(marker) {
      try {
        const { lat, lng } = marker?.position

        const response = await this.$axios.$get(
          `https://api.postcodes.io/postcodes?lon=${lng}&lat=${lat}`
        )
        const result = response?.result
        if (result) {
          const addressPostcode = result[0].postcode
          this.$emit('selected-address-postcode', addressPostcode)
        }
      } catch (error) {
        console.log(error)
      }
    },
    getDirection(direction) {
      this.direction = direction
      console.log(direction)
    },
    addSeconds(date, minutes) {
      date.setSeconds(date.getSeconds() + minutes)

      return date
    },
    subtractSeconds(date, minutes) {
      date.setSeconds(date.getSeconds() - minutes)

      return date
    },
  },
}
</script>

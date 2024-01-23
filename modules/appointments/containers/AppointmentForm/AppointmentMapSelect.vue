<template>
  <div>
    <GmapMap
      id="map"
      ref="map"
      :center="center"
      :zoom="8"
      style="width: 100%; height: 500px"
      @click="selectDestination"
    >
      <GmapMarker :position="origin.position" />
      <DirectionsRenderer
        :origin="origin.position"
        :destination="destination?.position"
        travel-mode="DRIVING"
        @return-direction="handleDirection"
      />
    </GmapMap>
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

      // Direction route to destination
      direction: null,
    }
  },
  watch: {
    date() {
      if (this.destination) {
        this.calculateAndReturnEstimates()
      }
    },
  },
  methods: {
    selectDestination(event) {
      const marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      this.destination = { position: marker }
    },
    handleDirection(event) {
      this.direction = event
      this.calculateAndReturnEstimates()
    },
    async calculateAndReturnEstimates() {
      const data = {
        postcode: await this.getDestinationPostcode(),
        estimates: {
          distance: await this.getDistanceToDestination(),
          duration: await this.getDurationToDestination(),
          outOfficeDate: await this.getEstimatedTimeToOutOfOffice(),
          backOfficeDate: await this.getEstimatedTimeBackToOffice(),
        },
      }
      this.$emit('return-estimates', data)
    },
    async getDestinationPostcode() {
      try {
        const { lat, lng } = this.destination.position

        const response = await this.$axios.$get(
          `https://api.postcodes.io/postcodes?lon=${lng}&lat=${lat}`
        )
        const result = response?.result
        if (result) {
          const addressPostcode = result[0].postcode
          return addressPostcode
        }
      } catch (error) {
        console.log(error)
      }
    },
    getDistanceToDestination() {
      let value = ''
      if (this.date && this.direction) {
        value = this.direction.routes[0].legs[0].distance.text
      }
      return value
    },
    getDurationToDestination() {
      let value = ''
      if (this.date && this.direction) {
        value = this.direction.routes[0].legs[0].duration.text
      }
      return value
    },
    getEstimatedTimeToOutOfOffice() {
      let value = ''
      if (this.date && this.direction) {
        const date = new Date(this.date)
        const duration = this.direction.routes[0].legs[0].duration.value

        const estDate = this.subtractSeconds(date, duration)
        value = this.$options.filters.formatDate(estDate)
      }
      return value
    },
    getEstimatedTimeBackToOffice() {
      let value = ''
      if (this.date && this.direction) {
        const date = new Date(this.date)
        const duration = this.direction.routes[0].legs[0].duration.value

        // duration * add back to office + 1 hour default appoinment time
        const totalTime = duration * 2 + 3600

        const estDate = this.addSeconds(date, totalTime)
        value = this.$options.filters.formatDate(estDate)
      }
      return value
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

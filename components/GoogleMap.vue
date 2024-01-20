<template>
  <div>
    marker:
    {{ marker }}
    <br />
    center:
    {{ center }}
    <br />
    place:
    {{ currentPlace }}
    <GmapMap
      :center="center"
      :zoom="8"
      style="width: 100%; height: 400px"
      @click="selectMap"
    >
      <GmapMarker
        v-if="marker"
        :position="marker.position"
        @click="center = marker.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 51.5, lng: -0.126 },
      currentPlace: null,
      marker: null,
    }
  },
  methods: {
    selectMap(e) {
      const marker = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
      this.marker = { position: marker }
      this.getPlaceInfo(marker)
    },
    async getPlaceInfo(position) {
      try {
        const { lat, lng } = position

        const response = await this.$axios.$get(
          `//api.postcodes.io/postcodes?lon=${lng}&lat=${lat}`
        )

        this.currentPlace = response
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

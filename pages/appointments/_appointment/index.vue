<template>
  <div class="page">
    <h1>Randevu Detay</h1>
    {{ apppointment }}
    <div class="page__form">
      <AppointmentForm />
    </div>
  </div>
</template>

<script>
import AppointmentForm from '@/modules/appointments/containers/AppointmentForm.vue'
export default {
  components: {
    AppointmentForm,
  },
  data() {
    return {
      apppointment: null,
    }
  },
  async fetch() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const appointmentId = this.$route.params.appointment
        const response = await this.$axios.$get(
          `https://api.airtable.com/v0/appgykZBGTF92MnHu/tblHgSMxTwolE6MeC/${appointmentId}`
        )

        this.apppointment = response
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

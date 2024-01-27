<template>
  <div class="page">
    <h1>Randevu Oluştur</h1>
    <p v-if="$fetchState.pending">Randevu Yükleniyor...</p>
    <div v-else class="page__form">
      <AppointmentForm v-model="data" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import { AppointmentForm } from '@/modules/appointments'
export default {
  components: {
    AppointmentForm,
  },
  data() {
    return {
      apppointment: null,
      data: {
        appointment_id: null,
        appointment_date: null,
        appointment_postcode: null,
        agent_id: null,
        contact_id: null,
        contact_name: null,
        contact_surname: null,
        contact_email: null,
        contact_phone: null,
      },
    }
  },
  async fetch() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const appointmentId = this.$route.params.appointment
        const response = await this.$api.$get(
          `/tblHgSMxTwolE6MeC/${appointmentId}`
        )
        this.data.appointment_id = response.id
        this.data.appointment_date = new Date(response.fields.appointment_date)
        this.data.appointment_postcode = response.fields.appointment_postcode
        this.data.agent_id = response.fields.agent_id?.[0]
        this.data.agent_name = response.fields.agent_name?.[0]
        this.data.agent_surname = response.fields.agent_surname?.[0]
        this.data.contact_id = response.fields.contact_id?.[0]
        this.data.contact_name = response.fields.contact_name?.[0]
        this.data.contact_surname = response.fields.contact_surname?.[0]
        this.data.contact_email = response.fields.contact_email?.[0]
        this.data.contact_phone = response.fields.contact_phone?.[0]
      } catch (error) {
        console.log(error)
      }
    },
    async handleSubmit() {
      try {
        await this.updateContact(this.data)
        await this.updateAppointment(this.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateContact(data) {
      try {
        const requestData = {
          contact_name: data.contact_name,
          contact_surname: data.contact_surname,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone,
        }
        const contact = await this.$api.$patch(
          `tblTSgRmykDmvOMJF/${this.data.contact_id}`,
          {
            fields: requestData,
          }
        )
        this.data.contact_id = contact.id
      } catch (error) {
        console.log(error)
      }
    },
    async updateAppointment(data) {
      try {
        const requestData = {
          appointment_date: data.appointment_date,
          appointment_postcode: data.appointment_postcode,
          agent_id: [data.agent_id],
          contact_id: [data.contact_id],
        }
        await this.$api.$patch(
          `tblHgSMxTwolE6MeC/${this.data.appointment_id}`,
          {
            fields: requestData,
          }
        )
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

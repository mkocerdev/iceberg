<template>
  <div class="page">
    <h1>Randevu Oluştur</h1>
    <div class="page__form">
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
      data: {
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
  methods: {
    async handleSubmit() {
      try {
        await this.createContact(this.data)
        const appointment = await this.createAppointment(this.data)
        await this.goToApointment(appointment)
      } catch (error) {
        console.log(error)
      }
    },
    async createContact(data) {
      try {
        const requestData = {
          contact_name: data.contact_name,
          contact_surname: data.contact_surname,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone,
        }
        const contact = await this.$api.$post(`tblTSgRmykDmvOMJF`, {
          fields: requestData,
        })
        this.data.contact_id = contact.id
      } catch (error) {
        console.log(error)
      }
    },
    async createAppointment(data) {
      try {
        const requestData = {
          appointment_date: data.appointment_date,
          appointment_postcode: data.appointment_postcode,
          agent_id: [data.agent_id],
          contact_id: [data.contact_id],
        }
        return await this.$api.$post(`tblHgSMxTwolE6MeC`, {
          fields: requestData,
        })
      } catch (error) {
        console.log(error)
      }
    },
    goToApointment(item) {
      const appointmentId = item.id
      this.$router.push(`/appointments/${appointmentId}`)
    },
  },
}
</script>

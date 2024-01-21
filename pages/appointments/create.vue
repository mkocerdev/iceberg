<template>
  <div class="page">
    <h1>Randevu Oluştur</h1>

    <div class="page__form">
      <AppointmentForm />
    </div>
  </div>
</template>

<script>
import { AppointmentForm } from '@/modules/appointments'
export default {
  components: {
    AppointmentForm,
  },
}
</script>

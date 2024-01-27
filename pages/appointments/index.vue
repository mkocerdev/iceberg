<!-- eslint-disable no-prototype-builtins -->
<template>
  <div class="page">
    <h1>Randevular</h1>
    <p v-if="$fetchState.pending">Randevular Yükleniyor...</p>
    <div v-else>
      <div class="page__head">
        <AppointmentFilter v-model="filterValues" />
      </div>
      <div class="page__table">
        <AppointmentList :data="items" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { AppointmentList, AppointmentFilter } from '@/modules/appointments'
export default {
  components: {
    AppointmentList,
    AppointmentFilter,
  },
  data() {
    return {
      data: {
        apppointments: null,
      },
      filterValues: {
        filterByFormula: '',
        'sort[0][field]': 'appointment_date',
        'sort[0][direction]': 'desc',
      },
    }
  },
  async fetch() {
    await this.loadData()
  },
  computed: {
    items() {
      return this.data.apppointments?.map((item) => ({
        appointment_id: item.id,
        appointment_postcode: item.fields?.appointment_postcode,
        appointment_date: item.fields?.appointment_date,
        out_of_date: this.isOutdatedAppointment(item.fields?.appointment_date), // return milliseconds betwenn two date,
        agent_name_surname: `${item.fields?.agent_name?.[0]} ${item.fields?.agent_surname?.[0]}`,
        contact_name_surname: `${item.fields?.contact_name?.[0]} ${item.fields?.contact_surname?.[0]}`,
        contact_phone: item.fields?.contact_phone?.[0],
        contact_email: item.fields?.contact_email?.[0],
      }))
    },
  },
  watch: {
    filterValues() {
      this.loadData()
    },
  },
  methods: {
    isOutdatedAppointment(date) {
      const now = dayjs()
      return dayjs(date).diff(now) <= 0 //  return milliseconds between two date
    },
    async loadData() {
      try {
        const params = {
          ...this.filterValues,
        }
        const response = await this.$api.$get(`/tblHgSMxTwolE6MeC`, {
          params,
        })
        this.data.apppointments = response.records
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  margin-bottom: 5rem;
  &__table {
    margin-bottom: 1rem;
  }
}
</style>

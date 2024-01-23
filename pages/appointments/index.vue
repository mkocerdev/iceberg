<template>
  <div class="page">
    <h1>Randevular</h1>
    <p v-if="$fetchState.pending">Fetching appointments...</p>
    <div v-else>
      <div class="page__table">
        <AppointmentList :data="items" />
      </div>
      <div class="page__pagination">
        <AppButton v-if="page" label="Next Page" @click="changePage(page)" />
        <AppButton v-else label="Previus Page" @click="changePage()" />
      </div>
    </div>
  </div>
</template>

<script>
import { AppointmentList } from '@/modules/appointments'
export default {
  components: {
    AppointmentList,
  },
  data() {
    return {
      apppointments: null,
      page: null,
    }
  },
  async fetch() {
    await this.loadData()
  },
  computed: {
    items() {
      return this.apppointments?.map((item) => ({
        appointment_id: item.id,
        appointment_postcode: item.fields.appointment_postcode,
        appointment_date: item.fields.appointment_date,
        agent_name_surname: `${item.fields.agent_name[0]} ${item.fields.agent_surname[0]}`,
        contact_name_surname: `${item.fields.contact_name[0]} ${item.fields.contact_name[0]}`,
        contact_phone: item.fields.contact_phone[0],
        contact_email: item.fields.contact_email[0],
      }))
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    changePage(page) {
      this.$router.push({ query: { page } })
    },
    async loadData() {
      try {
        let apiUrl = `/tblHgSMxTwolE6MeC`
        const page = this.$route.query.page
        if (page) {
          apiUrl = apiUrl + `?offset=${page}`
        }
        const response = await this.$api.$get(apiUrl)
        this.apppointments = response.records
        this.page = response.offset
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
  &__pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

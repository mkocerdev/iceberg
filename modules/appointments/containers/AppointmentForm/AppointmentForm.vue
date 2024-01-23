<template>
  <form class="appointment-form">
    <div class="appointment-form__group">
      <div class="appointment-form__title">
        <h3>Kişisel Bilgiler</h3>
      </div>
      <div class="appointment-form__row">
        <div class="appointment-form__col">
          <AppFormInput v-model="data.name" label="İsim" placeholder="İsim" />
        </div>
        <div class="appointment-form__col">
          <AppFormInput
            v-model="data.surname"
            label="Soyisim"
            placeholder="Soyisim"
          />
        </div>
      </div>
      <div class="appointment-form__row">
        <div class="appointment-form__col">
          <AppFormInput
            v-model="data.email"
            label="Email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="appointment-form__col">
          <AppFormInput
            v-model="data.phone"
            label="Phone"
            type="number"
            placeholder="Phone"
          />
        </div>
      </div>
    </div>
    <hr class="appointment-form__hr" />
    <div class="appointment-form__group">
      <div class="appointment-form__title">
        <h3>Randevu Bilgiler</h3>
      </div>
      <div class="appointment-form__row">
        <div class="appointment-form__col">
          <AppFormSelect
            v-model="data.agent"
            label="Randevu İle İlgilenecek Kişi"
            placeholder="Randevu İle İlgilenecek Kişi"
            :options="getAgents"
          />
        </div>
        <div class="appointment-form__col">
          <AppFormDatePicker
            v-model="data.date"
            label="Randevu Tarihi"
            type="datetime"
            placeholder="Randevu Tarihi"
          />
        </div>
      </div>

      <AppLabel>Randevu Detayları</AppLabel>
      <div class="appointment-form__row appointment-form__row--address">
        <div v-if="!data.date" class="appointment-form__row-overlay">
          Lütfen Önce Randevu Tarihi Seçiniz
        </div>
        <div class="appointment-form__col">
          <AppointmentEstimates
            :postcode="data.postcode"
            :estimates="estimates"
          />
        </div>
        <div class="appointment-form__col">
          <AppointmentMapSelect
            :date="data.date"
            @return-estimates="handleEstimates"
          />
        </div>
      </div>
    </div>

    <div class="appointment-form__submit">
      <AppButton label="Randevu Oluştur" />
    </div>
  </form>
</template>
<script>
import AppointmentMapSelect from './AppointmentMapSelect.vue'
import AppointmentEstimates from './AppointmentEstimates.vue'
// agent_id, agent_name, agent_surname
const AGENT_API_FIELDS = `fields=fldhTMplMEa2ySjyG&fields=fld95ySgmju6mxzQm&fields=fld0SJakuGst7D5AK`

export default {
  components: { AppointmentMapSelect, AppointmentEstimates },
  data() {
    return {
      agents: null,
      data: {
        name: null,
        surname: null,
        email: null,
        phone: null,
        postcode: null,
        agent: null,
        date: null,
      },
      estimates: {
        distance: null,
        duration: null,
        outOfficeDate: null,
        backOfficeDate: null,
      },
    }
  },
  computed: {
    getAgents() {
      return this.agents?.map((item) => ({
        label: `${item.fields?.agent_name} ${item.fields?.agent_surname}`,
        value: item.fields?.agent_id,
      }))
    },
  },
  async mounted() {
    try {
      const response = await this.$api.$get(
        `/tblxHgzNIVG1tMDBu?${AGENT_API_FIELDS}`
      )
      this.agents = response.records
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    handleEstimates(data) {
      const { postcode } = data
      const { distance, duration, outOfficeDate, backOfficeDate } =
        data.estimates
      this.data.postcode = postcode
      this.estimates.distance = distance
      this.estimates.duration = duration
      this.estimates.outOfficeDate = outOfficeDate
      this.estimates.backOfficeDate = backOfficeDate
    },
  },
}
</script>
<style lang="scss" scoped>
.appointment-form {
  background-color: #fdfdfd;
  border: 1px solid #ebecee;
  padding: 2rem;
  border-radius: var(--radius);
  margin-bottom: 5rem;
  &__hr {
    border: 0;
    height: 1px;
    background: #ebecee;
    margin: 2rem 0;
  }
  &__title {
    h1 {
      margin-top: 0;
      margin-bottom: 3rem;
    }
    h3 {
      margin-top: 0;
      margin-bottom: 2rem;
    }
  }
  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    position: relative;
    &--address {
      grid-template-columns: 2fr 5fr;
      gap: 0;
      background-color: #fff;
      border: 1px solid #ebecee;
      border-radius: var(--radius);
      overflow: hidden;
    }
    &-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #000000ba;
      z-index: 1;
      color: white;
      font-weight: bold;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__submit {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

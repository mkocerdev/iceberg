<template>
  <form class="appointment-form">
    <div class="appointment-form__group">
      {{ data }}
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
            type="phone"
            placeholder="Phone"
          />
        </div>
      </div>
    </div>
    <div class="appointment-form__group">
      <div class="appointment-form__title">
        <h3>Randevu Bilgiler</h3>
      </div>
      <div class="appointment-form__row">
        <div class="appointment-form__col">
          <AppFormInput
            v-model="data.postcode"
            label="Randevu Adresinin Posta Kodu"
            type="text"
            placeholder="Postcode"
            required
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
      <div class="appointment-form__row">
        <div class="appointment-form__col">
          <AppFormSelect
            v-model="data.agent"
            label="Randevu İle İlgilenecek Kişi"
            placeholder="Randevu İle İlgilenecek Kişi"
            :options="getAgents"
          />
        </div>
      </div>
    </div>
    <div class="appointment-form__group">
      <div class="appointment-form__title">
        <h3>Adres Bilgiler</h3>
      </div>
      <div class="appointment-form__row appointment-form__row--one">
        <div class="appointment-form__col">
          <h2>Adres Seçimi</h2>

          <GoogleMap />
        </div>
      </div>
      <div class="appointment-form__row">
        <div class="appointment-form__col">
          <p>Ofisten Adrese olan uzaklık (km) Adrese ve randevu saatine göre</p>
          <p>Ofisten tahmini çıkış zamanı</p>
          <p>Randevu sonrası ofie dönüş tahmini (Randevu süresi 1 saat)</p>
        </div>
      </div>
    </div>

    <div class="appointment-form__submit">
      <AppButton label="Randevu Oluştur" />
    </div>
  </form>
</template>
<script>
// agent_id, agent_name, agent_surname
const AGENT_API_FIELDS = `fields=fldhTMplMEa2ySjyG&fields=fld95ySgmju6mxzQm&fields=fld0SJakuGst7D5AK`
export default {
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
      const response = await this.$axios.$get(
        `https://api.airtable.com/v0/appgykZBGTF92MnHu/tblxHgzNIVG1tMDBu?${AGENT_API_FIELDS}`
      )
      this.agents = response.records
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
<style lang="scss" scoped>
.appointment-form {
  background-color: #fdfdfd;
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: var(--radius);
  &__group {
    margin-bottom: 2rem;
    border-bottom: 1px solid #ddd4d4;
  }
  &__title {
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
    &--one {
      grid-template-columns: 1fr;
    }
  }
}
</style>

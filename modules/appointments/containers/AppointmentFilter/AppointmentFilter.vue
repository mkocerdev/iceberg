<template>
  <div class="appointment-head">
    <div>
      <AppFormSelect
        :value="data.filterByFormula"
        placeholder="Randevu İle İlgilenecek Kişi"
        :options="agentItems"
        @input="handleFilterChange('filterByFormula', $event)"
      />
    </div>
    <div>
      <AppFormSelect
        :value="data['sort[0][direction]']"
        placeholder="Randevu tarihene göre sırala"
        :options="sortItems"
        @input="handleFilterChange('sort[0][direction]', $event)"
      />
    </div>
  </div>
</template>

<script>
const _ = require('lodash')
// agent_id, agent_name, agent_surname
const AGENT_API_FIELDS = `fields=fldhTMplMEa2ySjyG&fields=fld95ySgmju6mxzQm&fields=fld0SJakuGst7D5AK`
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: {
        ...this.value,
      },
      agents: null,
    }
  },
  computed: {
    agentItems() {
      const agents = this.agents?.map((item) => ({
        label: `${item.fields?.agent_name} ${item.fields?.agent_surname}`,
        value: `agent_id=${item?.fields.agent_id}`,
      }))

      return agents
    },
    sortItems() {
      return [
        {
          label: 'Geçmiş Randevular',
          value: 'asc',
        },
        {
          label: 'Gelecek Randevular',
          value: 'desc',
        },
      ]
    },
  },
  async mounted() {
    await this.loadAgents()
  },
  methods: {
    handleFilterChange(key, value) {
      this.data[key] = value
      this.applyFilter()
    },
    applyFilter() {
      this.$emit('input', _.cloneDeep(this.data))
    },
    async loadAgents() {
      try {
        const response = await this.$api.$get(
          `/tblxHgzNIVG1tMDBu?${AGENT_API_FIELDS}`
        )
        this.agents = response.records
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.appointment-head {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-end;
  margin-bottom: 1rem;
  gap: 1rem;
}
</style>

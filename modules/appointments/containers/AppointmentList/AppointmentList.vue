<template>
  <div>
    <table class="appointment-table">
      <thead>
        <tr>
          <th>İsim</th>
          <th>Soyisim</th>
          <th>Email</th>
          <th>Agent</th>
          <th>Postcode</th>
          <th>Randevu Tarihi</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          :class="{ outdated: item.out_of_date }"
        >
          <td>{{ item.contact_name_surname }}</td>
          <td>{{ item.contact_phone }}</td>
          <td>{{ item.contact_email }}</td>
          <td>{{ item.agent_name_surname }}</td>
          <td>{{ item.appointment_postcode }}</td>
          <td>
            <template v-if="item.appointment_date">
              {{ item.appointment_date | formatDate }}
            </template>
          </td>
          <td><AppButton label="Düzenle" @click="goToApointment(item)" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToApointment(item) {
      const appointmentId = item.appointment_id
      this.$router.push(`/appointments/${appointmentId}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.appointment-table {
  width: 100%;
  background-color: #fdfdfd;
  border: 1px solid #ebecee;
  border-radius: var(--radius);
  border-spacing: 0px;
  thead {
    background-color: #f4f4f4;
    th {
      text-align: left;
      font-weight: bold;
      font-size: 0.9rem;
      padding: 1rem 0.7rem;
    }
  }
  tbody {
    tr {
      &.outdated {
        opacity: 0.4;
      }
      td {
        text-align: left;
        font-size: 0.9rem;
        padding: 0.5rem 0.7rem;
      }
      &:not(:last-child) {
        td {
          border-bottom: 1px solid #ebecee;
        }
      }
    }
  }
}
</style>

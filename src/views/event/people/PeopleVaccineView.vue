<template>
  <table class="detail">
    <a v-for="vaccine in people.hasVaccines" :key="vaccine.id">
      <tr>
        <th>Vaccine name</th>
        <td>{{ vaccine.vaccineName }}</td>
      </tr>
      <tr>
        <th>Date</th>
        <td>{{ vaccine.date }}</td>
      </tr>
      <tr>
        <th>Number of dose</th>
        <td>{{ vaccine.dose }}</td>
      </tr>
    </a>
  </table>
</template>

<script>
export default {
  props: ['id', 'people']
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  background: white;
  padding: calc(4 * var(--size-bezel));
  margin-top: 20px;
  border-radius: var(--size-radius);
  border: 3px solid var(--color-shadow, currentColor);
  box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);
  width: 100;
}

table,
th,
td {
  border: 2px solid #212121;
}

.detail thead {
  background: #ffef62;
}

thead {
  color: #212121;
}

th,
td {
  text-align: center;
  padding: 5px 0;
}
th {
  width: 150pt;
  color: #212121;
  background-color: #ffef62;
}
td {
  width: 150pt;
  background-color: white;
}
</style>

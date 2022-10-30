<template>
  <table class="detail">
    <a v-for="vaccine in people.hasVaccines" :key="vaccine.id">
      <tr>
        <th>Vaccine name</th>
        <td>{{ vaccine.vaccineName }}</td>
      </tr>
      <tr>
        <th>Date</th>
        <td>{{ vaccine.vaccineName }}</td>
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
  margin-top: 13pt;
  margin-left: auto;
  margin-right: auto;
}

table,
th,
td {
  border: 2px solid #1abc9c;
}

.detail thead {
  background: #1abc9c;
}

thead {
  color: white;
}

th,
td {
  text-align: center;
  padding: 5px 0;
}
th {
  width: 150pt;
  color: white;
  background-color: #1abc9c;
}
td {
  width: 150pt;
  background-color: white;
}

</style>

<template>
  <body>
    <div class="box">
      <h1>Information</h1>
      <table class="detail">
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th>Hometown</th>
          <th>Comment</th>
        </tr>
        <tr>
          <td>{{ people.name }}</td>
          <td>{{ people.surname }}</td>
          <td>{{ people.age }}</td>
          <td>{{ people.hometown }}</td>
          <td>
            <div>
              <span v-for="comment in people.comment" :key="comment">
                {{ comment }}
              </span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</template>

<script>
export default {
  props: ['id', 'people']
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 1100px;
  margin-top: 13pt;
  margin-left: auto;
  margin-right: auto;
}

.detail {
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
  color: white;
  background-color: #1abc9c;
}
td {
  background-color: white;
}
.box {
  background-color: #c2fbd7;
  border-radius: 50px;
  border-width: 0;
  box-shadow: rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0;
  color: #008000;
  cursor: pointer;
  display: block;
  font-family: Arial, sans-serif;
  font-size: 1em;
  height: 200px;
  width: 1000pt;
  padding: 0 25px;
  transition: all 200ms;
  margin-left: auto;
  margin-right: auto;
}
.box:hover {
  background-color: #afe6c3;
  transform: scale(1);
}
.box h1 {
  margin-top: 100px;
  padding-left: 10;
  color: #008000;
  text-align: center;
}
</style>

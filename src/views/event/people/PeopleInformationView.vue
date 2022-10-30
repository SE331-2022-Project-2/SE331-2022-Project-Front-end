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
          <th>Doctor</th>
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
          <td>
            <span v-if="people.doctor != null">
              <p>Doctor : {{ people.doctor.name }}</p>
            </span>
          </td>
        </tr>
      </table>
    </div>
  </body>
  <div>
    <!-- <p>{{ people.name }} {{ people.surname }} {{ people.age }}</p>
    <p>{{ people.hometown }}</p>
    <span v-if="people.doctor != null">
      <p>Doctor : {{ people.doctor.name }}</p>
    </span> -->
    <form @submit.prevent="setDoctor">
      <BaseSelect
        :options="GStore.doctors"
        v-model="peopleToSet.doctor.id"
        label="Select Doctor"
      />
      <button type="submit">Submit</button>
    </form>
    <!-- 
    <span v-for="comment in people.comment" :key="comment">
      {{ comment }}
    </span> -->
  </div>
</template>

<script>
import PeopleService from '@/services/PeopleService'
import GStore from '@/store'
export default {
  inject: ['GStore'],
  props: ['id', 'people'],
  data() {
    return {
      peopleToSet: {
        id: GStore.people.id,
        // category: '',
        // title: '',
        // description: '',
        // location: '',
        doctor: { id: '', name: '' }
      }
    }
  },
  methods: {
    setDoctor() {
      console.log(this.peopleToSet)
      PeopleService.setDoctorToPatient(this.peopleToSet)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(() => {
          console.log('fail')
        })
    }
  }
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 1000px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

.detail {
  border: 2px solid #212121;
}

.detail thead {
  background: #212121;
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
  background-color: #212121;
}
td {
  background-color: white;
}
.box {
  display: block;
  font-family: Arial, sans-serif;
  font-size: 1em;
  height: 300px;
  width: 100pt;
  padding: 0 25px;
  background: white;
  padding: calc(4 * var(--size-bezel));
  margin-top: calc(4 * var(--size-bezel));
  border-radius: var(--size-radius);
  border: 3px solid var(--color-shadow, currentColor);
  box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.box h1 {
  margin-top: 10px;
  padding-left: 10;
  color: #ffef62;
  text-align: center;
  font-weight: 600;
}
button {
  color: currentColor;
  padding: 5px;
  background: #ffef62;
  border: 2px solid #212121;
  border-radius: var(--size-radius);
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #212121;
}
form{
  margin-top: 20px;
}
</style>

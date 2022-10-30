<template>
  <div v-if="GStore.user">
    <div class="box">

      <div id="nav">
        <!-- <router-link :to="{ name: 'PeopleInformations' }"
        >Information</router-link
      >
      |
      <router-link :to="{ name: 'PeopleVaccine' }">Vaccines</router-link>
      |
      <router-link :to="{ name: 'AddComment' }">Add Comment</router-link> -->
      </div>

      <table class="detail">
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Home town</th>
          <th>Role</th>
        </tr>
        <tr>
          <td>{{ GStore.user.username }}</td>
          <td>
            {{ GStore.user.email }}
          </td>
          <td>{{ GStore.user.age }}</td>
          <td>
            {{ GStore.user.hometown }}
          </td>
          <td>
            <span
              v-for="authoritie in GStore.user.authorities"
              :key="authoritie"
            >
              <div v-if="authoritie == 'ROLE_ADMIN'">Role : Admin</div>
              <div v-if="authoritie == 'ROLE_PEOPLE'">Role : Patient</div>
              <div v-if="authoritie == 'ROLE_DOCTOR'">Role : Doctor</div>
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <button class="patient" @click="changeToPatient">SetPatient</button>
  <button class="doctor" @click="changeToDoctor">SetDoctor</button>
  <!-- <router-view :people="GStore.people" /> -->
</template>
<script>
import AuthService from '@/services/AuthServices'
import GStore from '@/store'
export default {
  inject: ['GStore'],
  data() {
    return {
      userData: {
        id: GStore.user.id,
        fisrtname: GStore.user.firstname,
        lastname: GStore.user.lastname,
        age: GStore.user.age,
        hometown: GStore.user.hometown
      }
    }
  },
  methods: {
    changeToPatient() {
      console.log(this.userData)
      AuthService.changeToPatient(this.userData)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(() => {
          console.log('FAIL')
        })
    },
    changeToDoctor() {
      console.log(this.userData)
      AuthService.changeToDoctor(this.userData)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(() => {
          console.log('FAIL')
        })
    }
  }
}
</script>
<style scoped>
body {
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: 'Roboto Mono', monospace;
}

button {
  margin: 50px;
  font-family: inherit;
}
/* End of Page styling */

/* Simple button styling -- No animation */
.patient {
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
}

.patient::after {
  content: '';
  background-color: #dcbaff;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}
.patient:hover::after {
  top: 0px;
  left: 0px;
}
.doctor {
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
}

.doctor::after {
  content: '';
  background-color: #ffe54c;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.doctor:hover::after {
  top: 0px;
  left: 0px;
}
.box {
  background-color: #c2fbd7;
  border-radius: 50px;
  border-width: 0;
  box-shadow: rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0;
  color: #008000;
  cursor: pointer;
  display: inline-block;
  font-family: Arial, sans-serif;
  font-size: 1em;
  height: 200px;
  width: 1000px;
  padding: 0 25px;
  transition: all 200ms;
  margin-top: 100px;
}
.box:hover {
  background-color: #afe6c3;
  transform: scale(1);
}

.container {
  width: 90%;
  margin: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
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
</style>

<template>
  <div v-if="GStore.user">
    <h1>Hello</h1>
    <div id="nav">
      <!-- <router-link :to="{ name: 'PeopleInformations' }"
        >Information</router-link
      >
      |
      <router-link :to="{ name: 'PeopleVaccine' }">Vaccines</router-link>
      |
      <router-link :to="{ name: 'AddComment' }">Add Comment</router-link> -->
    </div>
    <p>
      {{ GStore.user.username }}
    </p>
    <button @click="changeToPatient">SetPatient</button>
    <button @click="changeToDoctor">SetDoctor</button>
    <!-- <router-view :people="GStore.people" /> -->
  </div>
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

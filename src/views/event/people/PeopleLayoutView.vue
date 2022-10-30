<template>
  <div v-if="GStore.people">
    <div id="nav">
      <router-link :to="{ name: 'PeopleInformations' }"
        >Information</router-link
      >
      |
      <router-link :to="{ name: 'PeopleVaccine' }">Vaccines</router-link>
      |<span v-if="isDoctor">
        <router-link :to="{ name: 'AddComment' }">Add Comment</router-link>
      </span>
    </div>
    <router-view :people="GStore.people" />
  </div>
</template>
<script>
import AuthServices from '@/services/AuthServices'
export default {
  inject: ['GStore'],
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthServices.hasRoles('ROLE_ADMIN')
    },
    isPeople() {
      return AuthServices.hasRoles('ROLE_PEOPLE')
    },
    isDoctor() {
      return AuthServices.hasRoles('ROLE_DOCTOR')
    }
  }
}
</script>

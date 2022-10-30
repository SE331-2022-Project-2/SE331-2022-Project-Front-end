<template>
  <div v-if="GStore.people">
    <div id="nav">
      <nav class="navi">
        <a>
              <router-link :to="{ name: 'PeopleInformations' }"
          >Information</router-link
        >
        </a>
    |
<a>
     <router-link :to="{ name: 'PeopleVaccine' }">Vaccines</router-link>
</a>
|
     <a>
       <span v-if="isDoctor">
          <router-link :to="{ name: 'AddComment' }">Add Comment</router-link>
        </span>
     </a>
     <div class="dot"></div>
      </nav>
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
<style scoped>

#nav {
  background-color: #212121;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#nav a :hover{
  color: #fddb3a;
}
</style>
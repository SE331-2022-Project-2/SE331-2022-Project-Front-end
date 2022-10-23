<template>
  <div v-if="GStore.people">
    <h1>{{ GStore.people.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'PeopleDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'PeopleRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'PeopleEdit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.people" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>

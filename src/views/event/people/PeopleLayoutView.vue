<template>
  <div v-if="GStore.people">
    <h1>Hello</h1>
    <div id="nav">
      <router-link :to="{ name: 'PeopleInformations' }"
        >Information</router-link
      >
      |
      <router-link :to="{ name: 'PeopleVaccine' }">Vaccines</router-link>
      |
      <router-link :to="{ name: 'PeopleComment' }">Doctor Comment</router-link>
    </div>
    <router-view :people="GStore.people" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>

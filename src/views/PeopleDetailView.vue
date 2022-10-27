<template>
  <div v-if="people">
    <h1>{{ people.title }}</h1>
    <p>{{ people.time }} on {{ people.date }} @ {{ people.location }}</p>
    <p>{{ people.description }}</p>
  </div>
</template>

<script>
import EventService from '@/services/PeopleService.js'

export default {
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  created() {
    // fetch event (by id) and set local event data
    EventService.getEvent(this.id)
      .then((response) => {
        this.people = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

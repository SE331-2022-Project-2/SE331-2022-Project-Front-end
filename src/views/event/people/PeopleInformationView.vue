<template>
  <div>
    <p>{{ people.name }} {{ people.surname }} {{ people.age }}</p>
    <p>{{ people.hometown }}</p>
    <p>Doctor : {{ people.doctor.name }}</p>

    <form @submit.prevent="setDoctor">
      <BaseSelect
        :options="GStore.doctors"
        v-model="peopleToSet.doctor.id"
        label="Select Doctor"
      />
      <button type="submit">Submit</button>
    </form>

    <span v-for="comment in people.comment" :key="comment">
      {{ comment }}
    </span>
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
img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */
}
/* Add a hover effect (blue shadow) */
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>

<template>
  <div>
    <h1>Add Vaccine</h1>
    <form @submit.prevent="addVaccine">
      <!-- <BaseInput
        v-model="people.category"
        type="text"
        label="Category"
        class="field"
      /> -->

      <h3>Name of patient</h3>

      <BaseSelect
        :options="GStore.peoples"
        v-model="vaccine.patient.id"
        label="select patient"
      />

      <label for="vaccine.vaccineName"> vaccine type : </label>
      <input id="vaccine.vaccineName" v-model="vaccine.vaccineName" />

      <label for="vaccine.date"> date : </label>
      <input id="vaccine.date" v-model="vaccine.date" />

      <label for="vaccine.dose"> dose : </label>
      <input id="vaccine.dose" v-model="vaccine.dose" />

      <!-- 
      <BaseInput
        v-model="vaccine.vaccineName"
        type="text"
        label="vaccine type"
      />

      <BaseInput v-model="vaccine.date" type="text" label="date" />

      <BaseInput v-model="vaccine.dose" type="text" label="dose" /> -->

      <!-- 
      <BaseSelect
        :options="GStore.doctors"
        v-model="vaccine.doctor.id"
        label="Select an Organizer"
      /> -->
      <!--       
      <BaseInput v-model="people.name" type="text" label="Title" />

      <BaseInput v-model="event.description" type="text" label="Description" />

      <h3>Where is your event?</h3>

      <label>Location</label>

      <BaseInput v-model="event.location" type="text" label="Location" />

      <h3>Who is your organizer?</h3>

      <BaseSelect
        :options="GStore.organizers"
        v-model="event.organizer.id"
        label="Select an Organizer"
      />
      <h3>The image of the Event</h3>
      <UploadImages @changed="handleImages" /> -->

      <button type="submit">Submit</button>
      <pre>{{ vaccine }}</pre>
    </form>
  </div>
</template>

<script>
import PeopleService from '@/services/PeopleService.js'
export default {
  inject: ['GStore'],
  components: {},
  data() {
    return {
      vaccine: {
        vaccineName: '',
        date: '',
        dose: null,
        // category: '',
        // title: '',
        // description: '',
        // location: '',
        patient: { id: '', name: '' }
      }
    }
  },
  methods: {
    addVaccine() {
      console.log(this.vaccine)
      PeopleService.addVaccine(this.vaccine)
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
<style scoped></style>

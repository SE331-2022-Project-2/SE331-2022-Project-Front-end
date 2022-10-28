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
        v-model="vaccine.people.id"
        label="select patient"
      />

      <h3>Name of doctor</h3>

      <BaseSelect
        :options="GStore.doctors"
        v-model="vaccine.doctor.id"
        label="Select an Organizer"
      />
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
      <UploadImages @changed="handleImages" />

      <button type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre> -->
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
        // category: '',
        // title: '',
        // description: '',
        // location: '',
        people: { id: '', name: '' },
        doctor: { id: '', name: '' }
      }
    }
  },
  methods: {
    addVaccine() {
      Promise.all(
        this.files.map((file) => {
          return PeopleService.uploadFile(file)
        })
      )
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'EventDetails',
            params: { id: response.data.id }
          })
          this.GStore.flashMessage =
            'You are successfully add a new event for ' + response.data.title
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    },
    handleImages(files) {
      this.files = files
    }
  }
}
</script>
<style scoped></style>

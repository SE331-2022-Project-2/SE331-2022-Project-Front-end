<template>
  <div>
    <h1>Apply role of user</h1>
    <form @submit.prevent="savePeople">
      <BaseInput
        v-model="people.category"
        type="text"
        label="Category"
        class="field"
      />

      <h3>Name & describe your event</h3>

      <BaseInput v-model="people.title" type="text" label="Title" />

      <BaseInput v-model="people.description" type="text" label="Description" />

      <h3>Where is your event?</h3>

      <label>Location</label>

      <BaseInput v-model="people.location" type="text" label="Location" />

      <h3>Who is your organizer?</h3>

      <BaseSelect
        :options="GStore.organizers"
        v-model="people.organizer.id"
        label="Select an Organizer"
      />
      <h3>The image of the Event</h3>
      <UploadImages @changed="handleImages" />

      <button type="submit">Submit</button>
    </form>

    <pre>{{ people }}</pre>
  </div>
</template>

<script>
import PeopleService from '@/services/PeopleService'
export default {
  inject: ['GStore'],
  components: {
    // UploadImages
  },
  data() {
    return {
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        organizer: { id: '', name: '' },
        imageUrls: []
      },
      files: []
    }
  },
  methods: {
    savePeople() {
      Promise.all(
        this.files.map((file) => {
          return PeopleService.uploadFile(file)
        })
      ).then((response) => {
        this.people.imageUrls = response.map((r) => r.data)
        PeopleService.savePeople(this.people)
          .then((response) => {
            console.log(response)
            this.$router.push({
              name: 'PeopleDetails',
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
      })
    },
    handleImages(files) {
      this.files = files
    }
  }
}
</script>
<style scoped></style>

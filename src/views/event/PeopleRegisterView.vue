<template>
  <div>
    <p>Registration form here</p>
    <button @click="register">Register Me</button>
  </div>
</template>

<script>
export default {
  props: ['id', 'people'],
  inject: ['GStore'],
  methods: {
    register() {
      this.GStore.flashMessage =
        'You are successfully register for ' + this.people.title
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      this.$router.push({
        name: 'PeopleDetails',
        params: { id: this.people.id }
      })
    }
  }
}
</script>

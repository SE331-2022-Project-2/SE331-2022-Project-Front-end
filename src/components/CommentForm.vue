<template>

  <form class="comment-form" @submit.prevent="onSubmit">
    <label for="comment">Comment:</label>
    <textarea id="comment" v-model="comment"></textarea>

    <input class="button" type="submit" value="Submit" />
  </form>
</template>
<script>
import GStore from '@/store'
export default {
  inject: ['GStore'],
  data() {
    return {
      //   people_id: '',
      comment: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.comment === '') {
        alert('Comment incomplete. Please fill out every field.')
        return
      }
      this.GStore.flashMessage = 'The comment is being added '
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3500)
      let doctorComment = {
        people_id: GStore.people.id,
        comment: this.comment
      }
      this.$emit('comment-submited', doctorComment)
      //   this.people_id = ''
      this.comment = ''
    }
  }
}
</script>
<style scoped>
input {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}

label {
  font-size: 20px;
  margin-bottom: 5px;
  text-align: left;
}

.comment-form {
  background: white;
  padding: calc(4 * var(--size-bezel));
  margin-top: calc(4 * var(--size-bezel));
  border-radius: var(--size-radius);
  border: 3px solid var(--color-shadow, currentColor);
  box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);
  width: 500px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}

.comment-form .button {
  display: block;
  margin: auto;
  margin-top: 25px;
  background: #212121;
  border: 2px solid #ffef62;
  border-radius: 5px;
  width: auto;
  color: white;
}

textarea {
  width: 100%;
  height: 70px;
  padding: 10px;
  font-size: 20px;
  margin-bottom: 10px;
}

@media only screen and (max-width: 600px) {
  .comment-form {
    width: 90%;
  }
}
</style>

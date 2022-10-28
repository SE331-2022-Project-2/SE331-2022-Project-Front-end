<template>
  <div class="row">
    <div class="col-12">
      <CommentForm @comment-submited="addComment" />
    </div>
  </div>
</template>
<script>
import CommentForm from '@/components/CommentForm.vue'
// import AuthService from '@/service/AuthService'
import PeopleService from '@/services/PeopleService'
import GStore from '@/store'
export default {
  inject: ['GStore'],
  components: {
    CommentForm
  },
  data() {
    return {
      newComment: null
    }
  },
  methods: {
    addComment(commentText) {
      console.log(commentText)
      console.log(GStore.people.id)

      // GStore.comments.push(commentText)
      // GStore.patient.doctorRec = GStore.comments.filter(
      //   (patient) => GStore.patient.id == patient.patient_id
      // )
      PeopleService.addComment(GStore.people.id, commentText.comment)
    }
  }
}
</script>

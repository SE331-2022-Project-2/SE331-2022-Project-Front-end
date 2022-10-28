<template>
  <div class="comment-container">
    <h4>Doctor Comment</h4>
    <span v-for="comment in people.comment" :key="comment">
      {{ comment }}
    </span>
  </div>
</template>
<script>
export default {
  props: ['comments']
}
</script>

<style scoped>
.comment-container {
  width: 425px;
  padding: 20px;
  font-size: 18px;
  text-align: left;
  margin: auto;
  margin-top: 40px;
  border-radius: 10px;
  background: #eff9fe;
  -webkit-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 20px -12px rgba(0, 0, 0, 0.57);
  border: 2px solid #d8d8d8;
}
</style>

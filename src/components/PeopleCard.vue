<template>
  <router-link
    class="event-link"
    :to="{ name: 'PeopleLayoutView', params: { id: people.id } }"
  >
    <div class="event-card">
      <img :src="people.imageUrls[0]" />
      <span>@{{ people.name }} on {{ people.surname }}</span>
      <h4>{{ people.hometown }}</h4>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'PeopleCard',
  props: {
    people: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>

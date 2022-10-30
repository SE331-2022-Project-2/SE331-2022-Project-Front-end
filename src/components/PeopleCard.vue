<template>
  <body>
    <router-link
      class="event-link"
      :to="{ name: 'PeopleLayoutView', params: { id: people.id } }"
    >
      <div class="event-card">
        <div class="imgBx">
          <img :src="people.imageUrls" />
        </div>
        <div class="details">
          <span>{{ people.name }} {{ people.surname }}</span>
          <h4>{{ people.dose }}</h4>
        </div>
      </div>
    </router-link>
  </body>
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
/* @import url('https://fonts.googleapis.com/css?family=Raleway:400,700'); */
body {
  /* float: right; */
  /* margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center; */
  float: right;
  width: 100%;

  min-height: 60vh;
  background: white;
  font-family: sans-serif;
}
.event-card {
  position: relative;
  width: 300px;
  height: 350px;
  background: #212121;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.event-card:before,
.event-card:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #fab700;
  transition: 0.5s;
  z-index: -1;
}
.event-card:hover:before {
  transform: rotate(20deg);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}
.event-card:hover:after {
  transform: rotate(10deg);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}
.event-card .imgBx {
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  background: #222;
  transition: 0.5s;
  z-index: 1;
}

.event-card:hover .imgBx {
  bottom: 80px;
}

.event-card .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}

.event-card img {
  max-width: 100%;
  margin-auto: auto;
}
.event-card .details h4 {
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 20px;
  color: #777;
  text-transform: uppercase;
}

.event-card .details {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  height: 60px;
  text-align: center;
}

.event-card .details span {
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  font-size: 20px;
}
</style>

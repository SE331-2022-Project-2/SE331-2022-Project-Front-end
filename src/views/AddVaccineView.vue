<template>
  <div>
    <h1>Add Vaccine</h1>
    <div class="card">
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
        <!-- <pre>{{ vaccine }}</pre> -->
      </form>
    </div>
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
<style scoped>
@import url('https://rsms.me/inter/inter.css');
:root {
  --color-light: white;
  --color-dark: #212121;
  --color-signal: #fab700;
  --color-background: var(--color-light);
  --color-text: var(--color-dark);
  --color-accent: var(--color-signal);
  --size-bezel: 0.5rem;
  --size-radius: 4px;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
  font-size: calc(0.6rem + 0.4vw);
  color: var(--color-text);
  background: var(--color-background);
  font-weight: 300;
  padding: 0 calc(var(--size-bezel) * 3);
}

h1, h3 {
  font-weight: 900;
}
.card {
  background: white;
  padding: calc(4 * var(--size-bezel));
  margin-top: calc(4 * var(--size-bezel));
  border-radius: var(--size-radius);
  border: 3px solid var(--color-shadow, currentColor);
  box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
input {
  position: relative;
}
input , form {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 3px solid currentColor;
  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  color: currentColor;
  background: transparent;
  border-radius: var(--size-radius);
  margin-left: auto;
  margin-right: auto;
}
button {
  color: currentColor;
  padding: 5px;
  background: #fab700;
  border: 2px solid #212121;
  border-radius: var(--size-radius);
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
}
button + button {
  margin-left: calc(var(--size-bezel) * 2);
}

</style>

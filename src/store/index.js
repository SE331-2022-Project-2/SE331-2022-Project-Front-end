import { reactive } from 'vue'
export default reactive({
  flashMessage: '',
  people: null,
  organizers: null,
  currentUser: JSON.parse(localStorage.getItem('user'))
})

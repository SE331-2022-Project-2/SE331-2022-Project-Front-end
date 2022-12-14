import apiClient from '@/services/AxiosClient.js'
import GStore from '@/store'
export default {
  register(user) {
    return apiClient.post('/register', {
      username: user.username,
      password: user.password,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      hometown: user.hometown,
      imageUrls: user.image
    })
  },
  login(user) {
    return apiClient
      .post('/auth', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        GStore.currentUser = response.data.user
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    GStore.currentUser = null
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  },
  hasRoles(roles) {
    if (GStore.currentUser && roles) {
      let containRoles = GStore.currentUser.authorities.filter((authority) =>
        roles.includes(authority)
      )
      if (containRoles.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  changeToPatient(user) {
    return apiClient.post('/applyPeople', {
      id: user.id
    })
  },
  changeToDoctor(user) {
    return apiClient.post('/applyDoctor', {
      id: user.id
    })
  }
}

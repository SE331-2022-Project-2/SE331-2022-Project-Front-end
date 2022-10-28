import apiClient from '@/services/AxiosClient.js'

export default {
  getUsers(perPage, page) {
    return apiClient.get('/user?_limit=' + perPage + '&_page=' + page)
  },
  getUser(id) {
    return apiClient.get('/user/' + id)
  }
}

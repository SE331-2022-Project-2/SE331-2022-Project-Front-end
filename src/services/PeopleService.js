import apiClient from '@/services/AxiosClient.js'

export default {
  getPeoples(perPage, page) {
    return apiClient.get('/people?_limit=' + perPage + '&_page=' + page)
  },
  getPeople(id) {
    return apiClient.get('/people/' + id)
  },
  savePeople(event) {
    return apiClient.post('/people', event)
  },
  getPeopleByKeyword(keyword, perPage, page) {
    return apiClient.get(
      'people?_limit=' + perPage + '&_page=' + page + '&title=' + keyword
    )
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

import apiClient from '@/services/AxiosClient.js'

export default {
  getPeoples(perPage, page) {
    return apiClient.get('/people?_limit=' + perPage + '&_page=' + page)
  },
  getPeople(id) {
    return apiClient.get('/people/' + id)
  },
  getPeopleAll() {
    return apiClient.get('/peopleAll')
  },
  savePeople(event) {
    return apiClient.post('/people', event)
  },
  addComment(id, newComment) {
    return apiClient.post('/comment/' + id, newComment)
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
  },
  setDoctorToPatient(people) {
    return apiClient.post('/setDoctor', people)
  },
  addVaccine(vaccine) {
    return apiClient.post('/vaccines', vaccine)
  }
}

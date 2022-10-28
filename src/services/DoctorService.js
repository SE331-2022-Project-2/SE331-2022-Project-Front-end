import apiClient from '@/services/AxiosClient.js'

export default {
  getDoctorAll() {
    return apiClient.get('/doctorAll')
  },
  getPatientOfDoctor(id) {
    return apiClient.get('/patientOfDoctor/' + id)
  }
}

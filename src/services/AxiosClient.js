import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://3.85.67.171:8999',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default apiClient

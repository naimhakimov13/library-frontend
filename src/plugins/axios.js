import axios from "axios";
import {useToast} from "vue-toastification";

export const HTTP = axios.create({
  baseURL: 'https://troubled-leather-jacket-bee.cyclic.app/api',
  headers: {
    'Content-Type': "application/json",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})


HTTP.interceptors.response.use(
  response => response.data,
  error => {
    const toast = useToast()
    if (Array.isArray(error?.response?.data)) {
      toast.error(error.response.data.join(', '))
    } else {
      toast.error(error.response.data.message)
    }
    throw error
  })

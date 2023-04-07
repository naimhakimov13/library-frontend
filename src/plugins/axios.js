import axios from "axios";
import {useToast} from "vue-toastification";

export const HTTP = axios.create({
  baseURL: 'https://library-backend.cyclic.app/api',
  // baseURL: 'http://localhost:3000/api',
  headers: {
    "Content-Type": "application/json"
  }
})

HTTP.interceptors.request.use(req => {
  req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return req
})

HTTP.interceptors.response.use(
  response => response.data,
  error => {
    const toast = useToast()
    if (Array.isArray(error?.response?.data)) {
      toast.error(error.response.data.join(', '))
    } else if (error.response.data.message) {
      toast.error(error.response.data.message)
    }
    throw error
  })

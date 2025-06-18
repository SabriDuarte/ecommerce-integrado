import axios from 'axios'
import useAuthStore from '../store/authStore'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambiá esto si tu API usa otro puerto o ruta
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
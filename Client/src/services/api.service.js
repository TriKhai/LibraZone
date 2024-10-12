import axios from 'axios'
import Cookies from 'vue-cookies'
const commonConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export default (baseURL) => {
  const axiosInstance = axios.create({
    baseURL,
    ...commonConfig
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return axiosInstance
}

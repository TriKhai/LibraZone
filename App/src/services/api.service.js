import axios from 'axios'
// import Cookies from 'vue-cookies'
const commonConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export default (baseURL) => {
  return axios.create({
    baseURL,
    ...commonConfig
  })
}

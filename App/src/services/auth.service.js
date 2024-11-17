import createApiClient from './api.service'
import Cookies from 'vue-cookies'
import router from '@/router/index'
import { useAuthStore } from '@/stores/auth.store'
class AuthServiceApi {
  constructor(baseUrl = '/api/v1/auth') {
    this.api = createApiClient(baseUrl)
  }

  async signUp(data) {
    try {
      const res = await this.api.post('/sign-up', data)
      if (res.status !== 201) throw new Error('Faild to sign up')

      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async logIn(data) {
    try {
      const res = await this.api.post('/log-in', data)
      const { token, user } = res.data
      const userId = user._id

      Cookies.set('accessToken', token, { secure: true, sameSite: 'Strict' })
      Cookies.set('userId', userId, { secure: true, sameSite: 'Strict' })

      if (user.role === 'admin') {
        console.log(user.role === 'admin')
        router.push({ name: 'dashboard' })
      } else {
        router.push({ name: 'home' })
      }

      if (res.status !== 200) throw new Error('Faild to log in')
      return user
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async signOut() {
    Cookies.remove('accessToken')
    Cookies.remove('userId')

    router.push({ name: 'log-in' })
    const authStore = useAuthStore
    authStore.$reset()
  }
}

export default new AuthServiceApi()

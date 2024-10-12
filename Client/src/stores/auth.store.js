import { defineStore } from 'pinia'
import AuthServiceApi from '../services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userRegister: null,
    userLogIn: null,
    token: null
  }),

  getters: {
    token: (state) => {
      return state.token
    },
    isAuthenticated: (state) => !!state.userLogIn
  },
  actions: {
    async signUpAction(payload) {
      //payload include info account of user
      try {
        const res = await AuthServiceApi.signUp(payload)
        if (res) {
          this.userRegister = res
        }
      } catch (error) {
        console.error('Lỗi đăng ký:', error.message)
        throw error
      }
    },

    async logInAction(payload) {
      try {
        const user = await AuthServiceApi.logIn(payload)
        this.userLogIn = user
      } catch (error) {
        console.error('Lỗi đăng nhập:', error.message)
        throw error
      }
    }
  }
})

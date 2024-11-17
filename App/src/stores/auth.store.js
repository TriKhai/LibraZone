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
      try {
        const res = await AuthServiceApi.signUp(payload)
        if (res) {
          this.userRegister = res
        }
        return 201
      } catch (error) {
        console.error('Lỗi đăng ký:', error.message)
        // if (error.status === 409) {
        //   return error.status
        // }
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
    },

    async logOutAction() {
      try {
        const user = await AuthServiceApi.signOut()
        this.userLogIn = user
      } catch (error) {
        console.error('Lỗi đăng nhập:', error.message)
        throw error
      }
    }
  }
})

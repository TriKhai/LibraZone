import { defineStore } from 'pinia'
import AdminServiceApi from '../services/admin.service'
import Cookies from 'vue-cookies'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admin: {}
  }),
  getters: {
    getAdmin: (state) => state.admin
  },
  actions: {
    async fetchAdmin() {
      try {
        const userId = Cookies.get('userId')
        if (!userId) throw new Error('User infor not found in cookies')

        const res = await AdminServiceApi.getAdmin(userId)
        if (!res || !res.data) {
          throw new Error('Failed to fetch user: Invalid response from server')
        }

        this.admin = res.data
        return res.data
      } catch (error) {
        console.log(error)
        this.admin = null
        return
      }
    }
  }
})

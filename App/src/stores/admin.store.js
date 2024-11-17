import { defineStore } from 'pinia'
import AdminServiceApi from '../services/admin.service'
import Cookies from 'vue-cookies'
import { ref } from 'vue'
import { useUserStore } from './user.store'

const userStore = useUserStore()
export const useAdminStore = defineStore('admin', {
  state: () => ({
    admin: ref(null)
  }),
  getters: {
    getAdmin: (state) => state.admin
  },
  actions: {
    async fetchAdmin() {
      if (userStore.user.role !== 'admin') {
        return
      }
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
        throw error
      }
    }
  }
})

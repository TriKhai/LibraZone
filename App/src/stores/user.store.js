import { defineStore } from 'pinia'
import UserServiceApi from '../services/user.service'
import Cookies from 'vue-cookies'
export const useUserStore = defineStore('user', {
  state: () => ({
    userList: null,
    deletedUser: null,
    user: null
  }),
  getters: {
    users: (state) => state.userList,
    user: (state) => state.user
  },
  actions: {
    async getUsersAction() {
      try {
        const userList = await UserServiceApi.getAllUser()
        this.userList = userList
        return userList
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sách:', err.message)
      }
    },

    async deleteUserAction(idUser) {
      try {
        const res = await UserServiceApi.delete(idUser)
        await this.getUsersAction()
        this.deletedUser = res
      } catch (err) {
        console.error('Lỗi xóa sách:', err.message)
      }
    },
    async fetchUser(force = false) {
      if (!(this.user === null || force)) throw new Error('Faild to fetch user')
      try {
        const userId = Cookies.get('userId')
        if (!userId) throw new Error('User infor not found in cookies')

        const res = await UserServiceApi.getUser(userId)
        if (!res || !res.data) {
          throw new Error('Failed to fetch user: Invalid response from server')
        }
        console.log('User fetched successfully:', res.data)
        this.$patch({
          user: res.data
        })
        return res.data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async isAdmin() {
      await this.fetchUser()
      if (this.user == null) {
        return false
      }
      return this.user.role === 'admin'
    }
  }
})

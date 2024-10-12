import { defineStore } from 'pinia'
import UserServiceApi from '../services/user.service'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userList: null,
      deletedUser: null
    }
  },
  getters: {
    users: (state) => state.userList
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
    }
  }
})

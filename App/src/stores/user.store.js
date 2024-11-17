import { defineStore } from 'pinia'
import UserServiceApi from '../services/user.service'
import Cookies from 'vue-cookies'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    userList: null,
    deletedUser: null,
    user: ref({}),
    selected: ref(5)
  }),
  getters: {
    users: (state) => state.userList,
    getUser: (state) => state.user
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

    async createUserAction(data) {
      try {
        const res = await UserServiceApi.createUser(data)
        await this.getUsersAction()
        return res.status
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sách:', err.message)
        return err.status
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
    },

    async editAvatar(idUser, formData) {
      try {
        const res = await UserServiceApi.updateAvatar(idUser, formData)
        console.log(res.status)
        if (res.status === 200) {
          const response = await UserServiceApi.getUser(idUser)
          this.$patch({
            user: response.data
          })
          // alert('Avatar updated successfully!')
        } else {
          // alert('Failed to update avatar. Please try again.')
        }
      } catch (error) {
        console.error('Error updating avatar:', error)
        // alert('An error occurred while updating avatar.')
      }
    },
    async editProfileUser(id, data) {
      try {
        const res = await UserServiceApi.update(id, data)
        this.$patch({
          user: res.data
        })
        return res
      } catch (err) {
        console.log(err)
      }
    },
    async changePassword(passwordData) {
      try {
        const userID = this.user._id
        const res = await UserServiceApi.updatePassword(userID, passwordData)
        return res
      } catch (error) {
        console.error('Error changing password:', error)
        throw error
      }
    },
    async deleteStore() {
      this.$patch({
        user: null
      })
    },
    async setValueSelected(valueSelected) {
      this.selected = valueSelected
    }
  }
})

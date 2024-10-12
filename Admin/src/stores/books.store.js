import { reactive } from 'vue'
import { defineStore } from 'pinia'
import BookServiceApi from '../services/books.service'
export const useBooksStore = defineStore('books', {
  state: () => ({
    bookList: reactive([]) // bookList là một mảng
  }),
  getters: {
    books: (state) => {
      return state.bookList
    }
  },
  actions: {
    async getAllBookAction() {
      try {
        this.bookList = await BookServiceApi.getAll()
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sách:', err.message)
      }
    },
    async createBookAction(payload) {
      try {
        const res = await BookServiceApi.create(payload)
        await this.getAllBookAction()
        return res
      } catch (err) {
        console.error('Lỗi tạo sách:', err.message)
      }
    },
    async deleteBookAction(id) {
      try {
        const res = await BookServiceApi.delete(id)
        await this.getAllBookAction()
        return res
      } catch (err) {
        console.error('Lỗi xóa sách:', err.message)
      }
    },
    async updateBookAction(id, data) {
      try {
        const res = await BookServiceApi.update(id, data)
        await this.getAllBookAction()
        return res
      } catch (err) {
        console.log(err)
      }
    }
  }
})

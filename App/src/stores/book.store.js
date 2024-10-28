import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import BookServiceApi from '../services/book.service'
export const useBookStore = defineStore('book', {
  state: () => ({
    booksFetch: reactive([]),
    bookList: reactive([]),
    bookDetail: reactive({}),
    searchBookList: reactive([]),
    inputSearch: ref(''),
    selected: ref(6)
  }),
  getters: {
    books: (state) => {
      return state.bookList.map((book) => ({
        ...book,
        image: `http://localhost:3000/${book.image}`
      }))
    },
    trendBooks: (state) => {
      return state.bookList.map((book) => ({
        ...book,
        image: `http://localhost:3000/${book.image}`
      }))
    },
    book: (state) => {
      return {
        ...state.bookDetail,
        image: `http://localhost:3000/${state.bookDetail.image}`
      }
    },
    searchBooks: (state) => {
      return state.searchBookList.map((book) => ({
        ...book,
        image: `http://localhost:3000/${book.image}`
      }))
    },
    inputSearchBook: (state) => {
      return state.inputSearch
    },
    getSelect: (state) => {
      return state.selected
    }
  },
  actions: {
    async fetchBookAction() {
      try {
        this.bookList = await BookServiceApi.getAll()
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sách:', err.message)
      }
    },
    async getBookAction(id) {
      console.log(id)
      try {
        const res = await BookServiceApi.get(id)
        this.bookDetail = res
        if (this.bookDetail) {
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log(err)
      }
    },
    async searchBookAction(keyword) {
      try {
        if (!keyword) return
        const books = await BookServiceApi.getSearch(keyword)
        this.searchBookList = books
      } catch (error) {
        console.log(error)
      }
    },
    async createBookAction(payload) {
      try {
        const res = await BookServiceApi.create(payload)
        await this.fetchBookAction()
        return res
      } catch (err) {
        console.error('Lỗi tạo sách:', err.message)
      }
    },
    async deleteBookAction(id) {
      try {
        const res = await BookServiceApi.delete(id)
        await this.fetchBookAction()
        return res
      } catch (err) {
        console.error('Lỗi xóa sách:', err.message)
      }
    },
    async updateBookAction(id, data) {
      try {
        const res = await BookServiceApi.update(id, data)
        await this.fetchBookAction()
        return res
      } catch (err) {
        console.log(err)
      }
    },
    async setValueSelected(valueSelected) {
      this.selected = valueSelected
    }
  }
})

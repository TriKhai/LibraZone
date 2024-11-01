import { defineStore } from 'pinia'
import TrackServiceApi from '../services/track.service'
import Cookies from 'vue-cookies'

export const useTrackStore = defineStore('track', {
  state: () => ({
    borrowedBooks: null,
    record: null
  }),
  getters: {
    // for user
    orderBooks: (state) => {
      if (!state.borrowedBooks || !Array.isArray(state.borrowedBooks)) {
        return []
      }
      return state.borrowedBooks
        .filter((record) => record.state === 'Order')
        .map((record) => ({
          ...record,
          image: `http://localhost:3000/${record.book.image}`
        }))
        .reverse()
    },
    waitingBooks: (state) => {
      if (!state.borrowedBooks || !Array.isArray(state.borrowedBooks)) {
        return []
      }
      return state.borrowedBooks
        .filter((record) => record.state === 'Waiting')
        .map((record) => ({
          ...record,
          image: `http://localhost:3000/${record.book.image}`
        }))
    },
    approvedBooks: (state) => {
      if (!state.borrowedBooks || !Array.isArray(state.borrowedBooks)) {
        return []
      }
      return state.borrowedBooks
        .filter((record) => record.state === 'Approved')
        .map((record) => ({
          ...record,
          image: `http://localhost:3000/${record.book.image}`
        }))
        .reverse()
    },
    getRecord: (state) => {
      return state.record
    }
  },
  actions: {
    async createBorrowAction(bookId) {
      try {
        const userId = await Cookies.get('userId')
        const payload = {
          userId: userId,
          bookId: bookId
        }
        console.log(payload)
        const res = await TrackServiceApi.createTrack(payload)
        console.log(res)
      } catch (err) {
        console.error('Faild to create track record', err.message)
        throw err
      }
    },
    // fetch for user
    async fetchBorrowedBooks() {
      try {
        const userId = await Cookies.get('userId')
        const bookList = await TrackServiceApi.getRecordUser(userId)
        if (!bookList) this.borrowedBooks = null
        else this.borrowedBooks = bookList
        return bookList
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async confirmBorrowBook(trackId, quantity) {
      try {
        const res = await TrackServiceApi.confirm(trackId, quantity)
        console.log(res)
        await this.fetchBorrowedBooks()
        await this.$patch({
          record: null
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async setRecord(record) {
      await this.$patch({
        record: record // Sử dụng $patch để cập nhật state nếu gặp lỗi proxy
      })
    }
  }
})

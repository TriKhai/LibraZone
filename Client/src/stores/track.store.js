import { defineStore } from 'pinia'
import TrackServiceApi from '../services/track.service'
import Cookies from 'vue-cookies'
export const useTrackStore = defineStore('track', {
  state: () => ({
    borrowedBooks: null
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
        this.borrowedBooks = bookList
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async confirmBorrowBook(trackId) {
      try {
        const res = await TrackServiceApi.confirm(trackId)
        this.fetchBorrowedBooks()
        this.borrowedBooks = res
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})

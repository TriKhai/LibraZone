import { reactive } from 'vue'
import { defineStore } from 'pinia'
import AuthorServiceApi from '../services/author.service'
export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    authorList: reactive([]) // bookList là một mảng
  }),
  getters: {
    authors: (state) => {
      return state.authorList
    }
  },
  actions: {
    async getAuthorsAction() {
      try {
        this.authorList = await AuthorServiceApi.getAuthors()
      } catch (err) {
        console.error('Get authors failed:', err.message)
      }
    },
    async createAuthorAction(payload) {
      try {
        const res = await AuthorServiceApi.create(payload)
        await this.getAuthorsAction()
        return res
      } catch (err) {
        console.error('Create author failed:', err.message)
      }
    },
    async deleteAuthorAction(id) {
      try {
        const res = await AuthorServiceApi.delete(id)
        await this.getAuthorsAction()
        return res
      } catch (err) {
        console.error('Delete author failed:', err.message)
      }
    },
    async updateAuthorAction(id, data) {
      try {
        const res = await AuthorServiceApi.update(id, data)
        await this.getAuthorsAction()
        return res
      } catch (err) {
        console.log(err)
      }
    }
  }
})

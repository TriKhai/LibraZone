import { reactive } from 'vue'
import { defineStore } from 'pinia'
import PublisherServiceApi from '../services/publisher.service'
export const usePublishersStore = defineStore('publishers', {
  state: () => ({
    publisherList: reactive([]) // bookList là một mảng
  }),
  getters: {
    publishers: (state) => {
      return state.publisherList
    }
  },
  actions: {
    async getPublishersAction() {
      try {
        this.publisherList = await PublisherServiceApi.getPublishers()
      } catch (err) {
        console.error('Lỗi khi lấy danh sách publisher', err.message)
      }
    },
    async createPublisherAction(payload) {
      try {
        const res = await PublisherServiceApi.create(payload)
        await this.getPublishersAction()
        return res
      } catch (err) {
        console.error('Lỗi tạo publisher:', err.message)
      }
    },
    async deletePublisherAction(id) {
      try {
        const res = await PublisherServiceApi.delete(id)
        await this.getPublishersAction()
        return res
      } catch (err) {
        console.error('Lỗi xóa publisher:', err.message)
      }
    },
    async updatePublisherAction(id, data) {
      try {
        const res = await PublisherServiceApi.update(id, data)
        await this.getPublishersAction()
        return res
      } catch (err) {
        console.log(err)
      }
    }
  }
})

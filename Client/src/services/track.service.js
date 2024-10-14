import createApiClient from './api.service'

class TrackServiceApi {
  constructor(baseUrl = '/api/v1/borrow') {
    this.api = createApiClient(baseUrl)
  }

  async createTrack(data) {
    try {
      const res = await this.api.post('/', data)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getRecords() {
    try {
      const res = await this.api.get('/')
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // for user
  async getRecordUser(userId) {
    try {
      const res = await this.api.get(`/${userId}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async confirm(recordId) {
    try {
      const res = await this.api.put(`/confirm/${recordId}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async approve(recordID) {
    try {
      const res = await this.api.put(`/approved/${recordID}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async delete(recordID) {
    try {
      const res = await this.api.delete(`/${recordID}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new TrackServiceApi()

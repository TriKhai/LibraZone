import createApiClient from './api.service'

class UserServiceApi {
  constructor(baseUrl = '/api/v1/users') {
    this.api = createApiClient(baseUrl)
  }

  async getAllUser() {
    try {
      const res = await this.api.get('/')
      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async getUser(userId) {
    try {
      const res = await this.api.get(`/${userId}`)
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async delete(id) {
    try {
      const res = await this.api.delete(`/${id}`)
      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}

export default new UserServiceApi()

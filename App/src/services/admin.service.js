import createApiClient from '@/plugins/axios'

class AdminServiceApi {
  constructor(baseUrl = '/api/v1/admin') {
    this.api = createApiClient(baseUrl)
  }

  async getAdmin(userId) {
    try {
      const res = await this.api.get(`/${userId}`)
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new AdminServiceApi()

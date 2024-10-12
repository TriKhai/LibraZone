import createApiClient from './api.service'

class BookServiceApi {
  constructor(baseUrl = '/api/v1/books') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const res = await this.api.get('/')
      // console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error.message)
      // throw error
    }
  }

  async create(data) {
    return (await this.api.post('/', data)).data
  }

  async deleteAll() {
    return (await this.api.delete('/')).data
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}

export default new BookServiceApi()

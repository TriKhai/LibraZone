import createApiClient from '@/plugins/axios'

class BookServiceApi {
  constructor(baseUrl = '/api/v1/books') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const res = await this.api.get('/')
      return res.data
    } catch (error) {
      console.log(error.response)
      throw error
    }
  }

  async get(id) {
    try {
      console.log(`Getting book with ID: ${id}`)
      const res = await this.api.get(`/${id}`)
      return res.data
    } catch (error) {
      console.error(`Error fetching book with ID ${id}:`, error.message)
      throw error
    }
  }

  async getSearch(keyword) {
    try {
      if (!keyword) return
      console.log(`Searching for: ${keyword}`)
      const encodedKeyword = encodeURIComponent(keyword) // Mã hóa keyword để tránh lỗi URL
      const res = await this.api.get(`/search/book?keyWord=${encodedKeyword}`)
      return res.data
    } catch (error) {
      console.error('Error searching books:', error.message)
      throw error
    }
  }

  async create(data) {
    try {
      const res = await this.api.post('/', data, {
        headers: {
          'Content-Type': 'multipart/form-data' // Định nghĩa Content-Type
        }
      })
      console.log(data)
      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async update(id, data) {
    return await this.api.put(`/${id}`, data)
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

  async deleteAll() {
    return (await this.api.delete('/')).data
  }
}

export default new BookServiceApi()

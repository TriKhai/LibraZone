import createApiClient from './api.service'

class AuthServiceApi {
  constructor(baseUrl = '/api/v1/account') {
    this.api = createApiClient(baseUrl)
  }

  async signUp(data) {
    try {
      const res = await this.api.post('/register', data)
      if (res.status === 201) {
        // hoặc 201 cho tạo mới
        return res.data
      } else {
        console.log(data)
        throw new Error('Đăng ký không thành công')
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async logIn(data) {
    try {
      const res = await this.api.post('/login', data)
      if (res.status === 200) {
        return res.data
      } else {
        console.log(data)
        throw new Error('Đăng ký không thành công')
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async getUser(id) {
    try {
      const res = await this.api.get(`/${id}`)
      return res.data
    } catch (err) {
      console.error('Error fetching user:', err)
      throw err
    }
  }
}

export default new AuthServiceApi()

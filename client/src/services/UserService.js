import $api from '../http'

export default class AuthService {
  static fetchOrder (email) {
    return $api.get('/getOrders', { params: { email } })
  }

  static fetchAllOrders () {
    return $api.get('/getAllOrders')
  }
}

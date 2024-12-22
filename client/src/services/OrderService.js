import $api from '../http'

export default class OrderService {
  static async addOrderButton (formData) {
    const { name, email, phone, type, info } = formData

    try {
      const response = await $api.post('/addOrder', {
        name,
        email,
        phone,
        type,
        info
      })
      console.log('Заказ успешно отправлен:', response.data)
      return response.data
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error.response?.data?.message || error.message)
      throw error
    }
  }
}
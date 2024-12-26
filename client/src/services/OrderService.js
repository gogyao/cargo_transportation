import $api from '../http'

export default class OrderService {
  static async addOrderButton (formData) {
    const { name, email, phoneNumber, dangerType, pickupLocation, deliveryLocation, description, price } = formData
    try {
      const response = await $api.post('/addOrder', {
        name,
        email,
        phoneNumber,
        dangerType,
        pickupLocation,
        deliveryLocation,
        description,
        price
      })
      console.log('Заказ успешно отправлен:', response.data)
      return response.data
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error.response?.data?.message || error.message)
      throw error
    }
  }

  static async deleteOrder (orderId) {
    const response = await $api.delete('/deleteOrder', { data: { id: orderId } })
    return response.data
  }

  static async editOrder (orderId, pickupLocation, deliveryLocation, description, status) {
    const response = await $api.put('/editOrder', {
      id: orderId,
      pickupLocation,
      deliveryLocation,
      description,
      status
    })
    return response.data
  }
}

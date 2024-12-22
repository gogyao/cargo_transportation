const { Order } = require('../models/models')

class OrderService {
    async addOrder(name, email, phoneNumber, dangerType, description) {
        const order = await Order.create({ name, email, phoneNumber, dangerType, description })
        return order
    }
}

module.exports = new OrderService()
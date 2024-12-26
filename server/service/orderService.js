const { Order } = require('../models/models')

class OrderService {
    async addOrder(name, email, phoneNumber, dangerType, pickupLocation, deliveryLocation, description, price) {
        const order = await Order.create({ name, email, phoneNumber, dangerType, pickupLocation, deliveryLocation, description, price })
        return order
    }
    async deleteOrder(id) {
        const result = await Order.destroy({ where: { id } });

        return result > 0;
    }
    async editOrder(orderId, pickupLocation, deliveryLocation, description, status) {
        const [updatedRows] = await Order.update(
            {
                pickupLocation,
                deliveryLocation,
                description,
                status
            },
            {
                where: { id: orderId }
            }
        );
    }

    async getAllOrders() {
        const order = await Order.findAll()
        return order
    }
}

module.exports = new OrderService()
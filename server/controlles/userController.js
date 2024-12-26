const ApiError = require("../exceptions/apiError")
const userService = require("../service/userService")
const orderService = require("../service/orderService")
const { validationResult } = require('express-validator')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password } = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(`${process.env.CLIENT_URL}/auth/personalaccount`)
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async addOrder(req, res, next) {
        try {
            const { name, email, phoneNumber, dangerType, pickupLocation, deliveryLocation, description, price } = req.body
            const orderData = await orderService.addOrder(name, email, phoneNumber, dangerType, pickupLocation, deliveryLocation, description, price)
            return res.json(orderData)
        } catch (e) {

        }
    }
    async getOrders(req, res, next) {
        try {
            const { email } = req.query;
            const order = await userService.getOrders(email)
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }
    async deleteOrder(req, res, next) {
        const { id } = req.body
        const result = await orderService.deleteOrder(id);
        return res.status(200).json({ message: 'Order deleted successfully' });
    }

    async editOrder(req, res, next) {
        const { id, pickupLocation, deliveryLocation, description, status } = req.body;
        const result = await orderService.editOrder(id, pickupLocation, deliveryLocation, description, status);
        res.status(200).send({ success: true, message: 'Order updated successfully' });
    }
    async getAllOrders(req, res, next) {
        try {
            const orders = await orderService.getAllOrders()
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()
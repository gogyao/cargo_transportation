const Router = require('express')
const userController = require('../controlles/userController')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/getOrders', userController.getOrders)
router.get('/getAllOrders', userController.getAllOrders)
router.post('/addOrder', userController.addOrder )
router.delete('/deleteOrder', userController.deleteOrder)
router.put('/editOrder', userController.editOrder)

module.exports = router
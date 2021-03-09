const express = require('express')
const router = express.Router()
const {protect, admin} = require('../middleware/authMiddleware')
const orders = require('../controllers/orderControllers')
const { addOrderItems , getOrderById, updateOrderToPaid , getMyOrders, getOrders, updateOrderToDeliverd} = orders

router.route('/').post(protect, addOrderItems).get(protect,admin , getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/delivered').put(protect,admin, updateOrderToDeliverd)

module.exports = router 

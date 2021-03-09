const express = require('express')

const router = express.Router()
const productControllers = require('../controllers/productController')
const {getProducts, getProductById, deleteProduct , createProduct, updateProduct, createProductReview, getTopProducts} = productControllers
const { protect, admin } = require("../middleware/authMiddleware");

router.route('/').get(getProducts).post(protect,admin, createProduct)
router.get('/top',getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, admin , deleteProduct).put(protect,admin,updateProduct) 


module.exports = router
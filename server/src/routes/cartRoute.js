const express = require('express')
const { addItemToCart } = require('../controllers/cartController')
const {
	requireSignedin,
	userMiddleware,
} = require('../utils/middlewares/middleware')

const cartRoute = express.Router()

//add to cart.
cartRoute.post(
	'/user/cart/addtocart',
	requireSignedin,
	userMiddleware,
	addItemToCart
)

module.exports = cartRoute

const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
	{
		//we need to reference the user who is using the cart.
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		//handle what goes inside the cart.
		cartItems: [
			//we will reference the products.
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart

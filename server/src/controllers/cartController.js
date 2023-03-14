const Cart = require('../models/cartModel')

exports.addItemToCart = (req, res) => {
	//create a cart, based on the usersID
	//it should be a buyer.
	Cart.findOne({ user: req.user._id }).exec((error, cart) => {
		//handle the error
		if (error) {
			return res.status(400).json({ error })
		}

		//if the user has already added an item in the cart, update the cart.
		if (cart) {
			//find if an item has already been added to the cart,

			//create a var to hold the items.
			const product = req.body.cartItems.product

			//use find function to get all the items that is in the cart,
			const isProductAdded = cart.cartItems.find(
				item => item.product == product
			)

			//create 2 variables.
			let condition, update

			//if so just increase the qunatity, dont add the same quantity again.
			if (isProductAdded) {
				condition = { user: req.user._id, 'cartItems.product': product }
				update = {
					//update the quantity item
					//$set=> updates items
					$set: {
						//cartitems is array
						//so we spread, the items inside the object.
						//then add the quantity with the amount of quantity added.
						// $-> updates a specific item not all
						'cartItems.$': {
							...req.body.cartItems,
							quantity: isProductAdded.quantity + req.body.cartItems.quantity,
						},
					},
				}
			} else {
				//if cart already exists update the amount of items
				// inside the cart..

				condition = { user: req.user._id }
				update = {
					$push: {
						cartItems: req.body.cartItems,
					},
				}
			}

			Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
				//handle the error
				if (error) {
					return res.status(400).json({ error })
				}

				//handle the success case.
				if (_cart) {
					return res.status(201).json({ cart: _cart })
				}
			})
		} else {
			//if it doesnt already exist, creare it here.
			//process the user data by getting the ID and the cart items.
			const cart = new Cart({
				//initially when you create products, its and array
				user: req.user._id, //will be extracted from the token, no need to provide,
				cartItems: [req.body.cartItems], //initially its an array
			})

			//save the cart.
			cart.save((error, cart) => {
				//handle the error.
				if (error) {
					return res.status(400).json({ error })
				}

				//if no error handle the success case.
				if (cart) {
					return res.status(201).json({ cart })
				}
			})
		}
	})
}

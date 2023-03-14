const Product = require('../models/productModel')
const slugify = require('slugify')

exports.createProduct = async (req, res) => {
	//since we will upload images we cannot accept the json data but rather the form data.
	//we will process both json file and the form data (images)
	//add the new Product.
	//destructure the data.
	const { name, price, description, category, quantity } = req.body

	//create a var to handle the pictures.
	let productPictures = []

	//handle the files (images).
	//if the file has an item then process the image.
	if (req.files.length > 0) {
		productPictures = req.files.map(file => {
			return (
				//return the generated file name.
				{ img: file.filename }
			)
		})
	}

	//create a new product.
	const product = new Product({
		name,
		slug: slugify(name),
		price,
		description,
		productPictures,
		category,
		quantity,
		createdBy: req.user._id,
	})

	//save the product.
	product.save((error, product) => {
		if (error) {
			return res.status(400).json({
				error,
			})
		}

		if (product) {
			return res.status(201).json({
				product,
			})
		}
	})
}

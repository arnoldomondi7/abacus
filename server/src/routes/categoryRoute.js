const express = require('express')

//controller to create the category.
const {
	addCategory,
	getCategories,
} = require('../controllers/categoryController')
const {
	requireSignedin,
	adminMiddleware,
} = require('../utils/middlewares/middleware')

//should be used by both the user and the admin of the application.
const categoryRoute = express.Router()

//create a categiry.
categoryRoute.post(
	'/category/create',
	requireSignedin,
	adminMiddleware,
	addCategory
)
//fetch the categiies.
categoryRoute.get('/category/getcategories', getCategories)

module.exports = categoryRoute

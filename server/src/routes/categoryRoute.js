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

//multer and image uploads.
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

//The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// path.dirname()=> root directory
		//__dirname==> current directory
		//path.join=> joins 2 paths
		cb(null, path.join(path.dirname(__dirname), 'uploads'))
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + '-' + file.originalname)
	},
})

//create the middleware that will handle the upload process.
//dest=> where the file wil be uploaded.
const upload = multer({ storage })

//create a categiry.
categoryRoute.post(
	'/category/create',
	requireSignedin,
	adminMiddleware,
	upload.single('categoryImage'),
	addCategory
)
//fetch the categiies.
categoryRoute.get('/category/getcategories', getCategories)

module.exports = categoryRoute

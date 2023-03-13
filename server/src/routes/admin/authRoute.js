const express = require('express')
const { signUp, signinUser } = require('../../controllers/admin/authController')
const {
	validateSignUp,
	isRequestValidated,
	validateSignIn,
} = require('../../utils/validators/auth.validator')

//controller functions

//initialize the router.
const adminRouter = express.Router()

//signup the user
adminRouter.post('/admin/signup', validateSignUp, isRequestValidated, signUp)

//sigin in the user.
adminRouter.post(
	'/admin/signin',
	validateSignIn,
	isRequestValidated,
	signinUser
)

//express the router.
module.exports = adminRouter

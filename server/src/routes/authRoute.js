const express = require('express')

//controller functions
const { signinUser, signUp } = require('../controllers/authController')
const {
	validateSignUp,
	isRequestValidated,
	validateSignIn,
} = require('../utils/validators/auth.validator')

//initialize the router.
const authRouter = express.Router()

//signup the user
authRouter.post('/auth/signup', validateSignUp, isRequestValidated, signUp)

//sigin in the user.
authRouter.post('/auth/signin', validateSignIn, isRequestValidated, signinUser)

//express the router.
module.exports = authRouter

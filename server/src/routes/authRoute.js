const express = require('express')

//controller functions
const { signinUser, signUp } = require('../controllers/authController')

//initialize the router.
const authRouter = express.Router()

//signup the user
authRouter.post('/auth/signup', signUp)

//sigin in the user.
authRouter.post('/auth/signin', signinUser)

//express the router.
module.exports = authRouter

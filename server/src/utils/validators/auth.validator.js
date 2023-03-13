const { check, validationResult } = require('express-validator')

//array to check for errors
exports.validateSignUp = [
	check('firstName').notEmpty().withMessage('Firstname Is Required'),
	check('lastName').notEmpty().withMessage('Lastname Is Required'),
	check('email').isEmail().withMessage('Valid Email Is Required'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Password Must Be At least 8 Characters Long'),
]

//validation to sign in users.
exports.validateSignIn = [
	check('email').isEmail().withMessage('Valid Email Is Required'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Password Must Be At least 8 Characters Long'),
]

//function to log error messages if there is an error.
exports.isRequestValidated = (req, res, next) => {
	const errors = validationResult(req)

	//send the response to the ui.
	if (errors.array().length > 0) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		})
	}
	//go on to the next function.
	next()
}

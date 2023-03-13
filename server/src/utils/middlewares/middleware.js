const jwt = require('jsonwebtoken')

//function that will require the user to be signed in for protection.
exports.requireSignedin = (req, res, next) => {
	//ensure that the token exists
	if (req.headers.authorization) {
		//get the token from the headers.
		//split function makes it an array
		const token = req.headers.authorization.split(' ')[1]

		//veryfy the users token to ensure that he/she is thesigned in user.
		const user = jwt.verify(token, process.env.JWT_SECRET)
		//create a new property attatch it  to the user.
		req.user = user
	} else {
		res.status(401).json({
			message: 'Authorization Required',
		})
	}

	next()
}

//create the middlewares for both the user
exports.userMiddleware = (req, res, next) => {
	//ensure the role is user if not log an error
	if (req.user.role !== 'user') {
		return res.status(401).json({
			message: 'User, Resource Access Denied',
		})
	}

	//go on to the next event.
	next()
}

//create the middlewares for both the  admin.
exports.adminMiddleware = (req, res, next) => {
	if (req.user.role !== 'admin') {
		return res.status(401).json({
			message: 'Admin, Resource Access Denied',
		})
	}

	//go on to the next event.
	next()
}

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//function to sign up the user.
exports.signUp = (req, res) => {
	//ensure that the user is not already registered.
	User.findOne({ email: req.body.email }).exec((error, user) => {
		if (user) {
			return res.status(400).json({
				message: 'User With This Email Is Alredy Registered!',
			})
		}

		//create a new user if not already registered.
		//destructure
		const { firstName, lastName, email, password } = req.body
		//register the user
		const _user = new User({
			firstName,
			lastName,
			email,
			password,
			username: Math.random().toString(),
		})

		//save the user.
		//handle the call back function.
		_user.save((error, data) => {
			//handle the error.
			if (error) {
				return res.status(400).json({
					message: 'Unable to Register the User.',
				})
			}
			//send the data to the user frontend if it worksout well.
			if (data) {
				return res.status(201).json({
					message: 'New User Created',
				})
			}
		})
	})
}

//function to sign in the user.
exports.signinUser = (req, res) => {
	//check if the user is registeres.
	User.findOne({ email: req.body.email }).exec((error, user) => {
		//handle the error.
		if (error) {
			return res.status(400).json({ message: error })
		}

		//handle the user.
		if (user) {
			//conpare the passwords.
			if (user.authenticate(req.body.password)) {
				//create the token,
				const token = jwt.sign(
					{ _id: user._id, role: user.role },
					process.env.JWT_SECRET,
					{
						expiresIn: '7d',
					}
				)

				//destructure what will be read in the client.
				const { _id, firstName, lastName, email, fullName, role } = user

				//send the res to the user.
				res.status(200).json({
					token,
					user: {
						_id,
						firstName,
						lastName,
						email,
						fullName,
						role,
					},
				})
			} else {
				res.status(400).json({
					message: 'Invalid Credentials',
				})
			}
		} else {
			return res.status(400).json({ message: 'Something went wrong' })
		}
	})
}

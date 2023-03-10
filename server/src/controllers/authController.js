const User = require('../models/userModel')

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
exports.signinUser = (req, res) => {}

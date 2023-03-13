const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 2,
			max: 22,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			min: 2,
			max: 22,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			index: true,
			lowercase: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		hashed_password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'seller'],
			default: 'user',
		},
		contactNumber: {
			type: String,
		},
		profilePicture: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

//virtual field to handle the password.
userSchema.virtual('password').set(function (password) {
	let user = this

	const salt = bcrypt.genSaltSync(10)
	user.hashed_password = bcrypt.hashSync(password, salt)
})

//create a virtual for fullname.
userSchema.virtual('fullName').get(function () {
	const user = this

	const fullName = `${user.firstName} ${user.lastName}`
	return fullName
})
//create the methods that will handle the authentication.
userSchema.methods = {
	authenticate: function (password) {
		let user = this
		return bcrypt.compareSync(password, user.hashed_password)
	},
}

const User = mongoose.model('User', userSchema)

//export the user.
module.exports = User

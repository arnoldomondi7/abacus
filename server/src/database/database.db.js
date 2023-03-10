const mongoose = require('mongoose')

exports.connectToDB = () => {
	try {
		mongoose.set('strictQuery', true)
		mongoose.connect(process.env.MONGO_DB)
		//log a success message.
		console.log('App connected to the db')
	} catch (error) {
		console.log('App Failed to connect to the db')
	}
}

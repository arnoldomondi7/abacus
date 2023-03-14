// import the libs
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

//other files.
const { connectToDB } = require('./database/database.db')

//initialise the server.
const app = express()

//handle the middlewares.
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(compression())

//handle rhe routes.
app.use('/api', require('./routes/admin/authRoute'))
app.use('/api', require('./routes/authRoute'))
app.use('/api', require('./routes/categoryRoute'))
app.use('/api', require('./routes/productRoute'))
app.use('/api', require('./routes/cartRoute'))

//listen to the app.
app.listen(process.env.PORT, error => {
	if (error) {
		return console.log('Unable to Listen to the app')
	}
	connectToDB()
	console.log(`App is Listening on Port ${process.env.PORT} `)
})

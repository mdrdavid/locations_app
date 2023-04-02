const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const HttpError = require('./models/http-errors')

const placesRouter = require('./routes/places-routes')
const usersRouter = require('./routes/users-routes')

const port = 5000
const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next()
})
app.use('/api/places', placesRouter)
app.use('/api/users', usersRouter)

// handling error for unsupported routes, run if not route is reached
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error
})

// error handling middleware
app.use((error, req, res, next) => {
    if (res.headerSet) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred' })
})
// connect to database
mongoose
    .connect(
        'mongodb+srv://david:david@cluster0.bkgfjsx.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() =>
        // if the connection is successfully start the server
        app.listen(port, () => console.log(`Server running on port ${port} `))
    )
    .catch((err) => {
        console.log(err)
    })

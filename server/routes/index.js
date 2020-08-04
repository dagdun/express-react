const express = require('express')
const app = express()

const exampleRouter = require('./example.route')

app.use('/example', exampleRouter)

module.exports = app

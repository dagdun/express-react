require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { response } = require('./middlewares/response')
const route = require('./routes/index')

const main = async ({ mongo_url, port, middleware }) => {
  (async () => {
    await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  })();
    
  app.use(bodyParser.json())
  app.use(response)

  if (middleware) {
    app.use(middleware)
  }
  
  app.use('/v1.0', route)
  
  if (port) {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  }
  return app
  
}
module.exports = main

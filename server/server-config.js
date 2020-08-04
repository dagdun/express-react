require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose')
const { response } = require('./middlewares/response')
const route = require('./routes/index')

const main = async ({ mongo_url, port }) => {
  ;(async () => {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })()

  app.use(cors())
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(express.static(path.resolve(__dirname, '..', 'build')))

  app.use(response)
  app.use('/v1.0', route)

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  })

  if (port) {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`),
    )
  }
  return app
}
module.exports = main

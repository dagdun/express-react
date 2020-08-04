const server = require('./server-config')

const port = process.env.PORT || 8080
const mongo_url = process.env.MONGO_URL

server({ mongo_url, port })

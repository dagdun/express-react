const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const server = require('../server-config')

const startServer = async () => {
  const mongod = new MongoMemoryServer()
  await mongod.start()
  const mongo_url = await mongod.getUri()
  return server({ mongo_url })
}

const stopServer = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

module.exports = {
  startServer,
  stopServer,
}

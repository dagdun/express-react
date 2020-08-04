const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exampleSchema = new Schema(
  {
    name: String,
    updateTime: Date,
    createTime: Date,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id
        delete ret.__v
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.__v
      },
    },
  },
)

const exampleModel = mongoose.model('example', exampleSchema)

module.exports = exampleModel

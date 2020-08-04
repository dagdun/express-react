const exampleModel = require('../../models/example')

const get = async (req, res) => {
  const doc = await exampleModel.find({}).limit(10)
  res.sendFormat(doc)
}

const post = async (req, res) => {
  const { name, updateTime, createTime } = req.body
  const doc = exampleModel({
    name,
    updateTime,
    createTime,
  })
  const saveDoc = await doc.save()
  if (saveDoc) {
    res.sendFormat(saveDoc.toJSON())
  } else {
    res.sendFormat({}, 'save error', 500)
  }
}

const getId = async (req, res) => {
  const doc = await exampleModel.findOne({ _id: req.params.id })
  if (doc) {
    res.sendFormat(doc.toJSON())
  } else {
    res.sendFormat({}, 'doc not found', 404)
  }
}

const postId = async (req, res) => {
  const { name } = req.body
  const doc = await exampleModel.findOne({ _id: req.params.id })
  if (!doc) {
    return res.sendFormat({}, 'doc not found', 404)
  }

  doc.name = name
  doc.updatedTime = +new Date()
  const docResult = await doc.save()
  if (docResult) {
    return res.sendFormat(doc.toJSON())
  } else {
    return res.sendFormat({}, 'error update', 500)
  }
}

const deleteId = async (req, res) => {
  const doc = await exampleModel.remove({ _id: req.params.id })
  if (doc.ok === 1) {
    res.sendFormat({})
  } else {
    res.sendFormat({}, 'delete fail', 500)
  }
}

module.exports = { get, post, getId, postId, deleteId }

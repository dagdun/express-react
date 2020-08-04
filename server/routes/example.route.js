const express = require('express')
const app = express()

const {
  get,
  post,
  getId,
  postId,
  deleteId,
} = require('../controllers/v1.0/example.controller')

app

  // get
  .get('/', get)

  // post
  .post('/', post)

app
  // get
  .get('/:id', getId)

  // post
  .post('/:id', postId)

  // get
  .delete('/:id', deleteId)

module.exports = app

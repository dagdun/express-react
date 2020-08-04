const response = (req, res, next) => {
  res.sendFormat = (data = {}, message = 'success', status = 200) => {
    res.send({
      status: status,
      message,
      data,
    })
  }
  next()
}

module.exports = { response }

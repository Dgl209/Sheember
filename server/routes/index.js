const express = require('express')
const route = express.Router({ mergeParams: true })

route.use('/constants', require('./constants.routes'))

module.exports = route

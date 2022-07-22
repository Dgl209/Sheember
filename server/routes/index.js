const express = require('express')
const route = express.Router({ mergeParams: true })

route.use('/constants', require('./constants.routes'))
route.use('/auth', require('./auth.routes'))

module.exports = route

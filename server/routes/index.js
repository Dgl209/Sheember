const express = require('express')
const route = express.Router({ mergeParams: true })

route.use('/constants', require('./constants.routes'))
route.use('/auth', require('./auth.routes'))
route.use('/ads', require('./ads.routes'))
route.use('/comments', require('./comments.routes'))

module.exports = route

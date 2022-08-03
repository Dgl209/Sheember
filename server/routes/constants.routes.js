const express = require('express')
const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const router = express.Router({ mergeParams: true })

router.get('/categories', async (req, res) => {
  try {
    const list = await Category.find()
    res.status(200).send(list)
  } catch(error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/subcategories', async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query
    let list
    if (orderBy && equalTo) {
      list = await Subcategory.find({ [orderBy]: equalTo })
    } else {
      list = await Subcategory.find()
    }
    res.status(200).send(list)
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

module.exports = router

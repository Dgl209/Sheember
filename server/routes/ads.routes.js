const express = require('express')
const Ad = require('../models/Ad')
const auth = require('../middleware/auth.middleware')
const sort = require('../utils/sort.helper')
const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query
      const list = await Ad.find({ [orderBy]: equalTo })
      const sortedList = sort(list)
      res.status(200).send(sortedList)
    } catch(error) {
      res.status(500).json({ message: `Server error: ${error}` })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newAd = await Ad.create({
        ...req.body,
        publisher: req.user._id
      }) 
      
      res.status(201).send(newAd)
    } catch(error) {
      res.status(500).json({ message: `Server error: ${error}` })
    }
  })

router.get('/ad/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    const data = await Ad.findOne({ _id })
    res.status(200).send(data)
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

router.get('/collection', async (req, res) => {
  try {
    const { payload } = req.body

    const data = await Promise.all(
      payload.map(async _id => await Ad.find({ _id }))
    )
    const transformData = data.map(item => item[0])
    const sortedData = sort(transformData)
    res.status(200).send(sortedData)
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

router.get('/recently', async (req, res) => {
  try {
    const ads = await Ad.find()
    const sortedAds = sort(ads)
    if (sortedAds.length < 12) {
      res.status(200).send(sortedAds)
    } else {
      const recentlyAds = sortedAds.slice(0, 12)
      res.status(200).send(recently)  
    }
    
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

router.patch('/:_id', auth, async (req, res) => {
  try {
    const { _id } = req.params
    const ad = await Ad.findOne({ _id })

    if (ad.publisher.toString() === req.user._id) {
      const updatedAd = await Ad.findByIdAndUpdate(_id, req.body, { new: true })
      res.status(200).send(updatedAd)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }

  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

module.exports = router

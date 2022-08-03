const express = require('express')
const Ad = require('../models/Ad')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const sort = require('../utils/sort.helper')
const router = express.Router({ mergeParams: true })


router
  .route('/')
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query
      const list = await Ad.find({ [orderBy]: equalTo })
     
      const modificatedAds = await modificateAds(list)
      res.status(200).send(modificatedAds)
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

/* router.get('/ad/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    const data = await Ad.findOne({ _id })
    res.status(200).send(data)
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
}) */ 

router.post('/collection', auth, async (req, res) => {
  try {
    const payload = req.body

    const data = await Promise.all(
      payload.map(async _id => await Ad.find({ _id }))
    )

    const transformData = data.map(item => item[0])
    const modificatedAds = await modificateAds(transformData)
    res.status(200).send(modificatedAds)
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

router.get('/recently', async (req, res) => {
  try {
    const ads = await Ad.find()
    const modificatedAds = await modificateAds(ads)
    if (modificatedAds.length < 12) {
      res.status(200).send(modificatedAds)
    } else {
      const recentlyAds = modificatedAds.slice(0, 12)
      res.status(200).send(recentlyAds)  
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
      const updatedAd = await Ad.findByIdAndUpdate(_id, { ...req.body, publisher: req.user._id }, { new: true })
      res.status(200).send(updatedAd)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }

  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

router.delete('/:_id', auth, async (req, res) => {
  try {
   const { _id } = req.params 
    const ad = await Ad.findOne({ _id })

    if (!ad) {
      return res.status(404).json({ message: 'NOT_FOUND' })
    }

    if (ad.publisher.toString() !== req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await ad.remove()
    return res.send(null)
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

async function modificateAds(ads) {
  const sortedAds = sort(ads)
  const modificatedList = await getPublisherData(sortedAds)
  const result = await Promise.all(modificatedList)
  return result
}

async function getPublisherData(array) {
  const data = await array.map(async item => {
    const user = await User.findById(item.publisher.toString())
    const test =  {
      ...item,
      publisher: user
    }
    return { ...test._doc, publisher: test.publisher }
  })
  return await Promise.all(data)
}

module.exports = router

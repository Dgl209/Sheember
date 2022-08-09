const { Schema, model } = require('mongoose')

const schema = new Schema({
  id: {type: String, required: true},
  image: { type: String },
  name: {type: String, required: true},
  parent_id: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = model('Subcategory', schema)

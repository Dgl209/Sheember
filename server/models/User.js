const { Schema, model } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  id: { type: String },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Ad' }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'Ad' }]
}, {
  timestamps: true
})

module.exports = model('User', schema)

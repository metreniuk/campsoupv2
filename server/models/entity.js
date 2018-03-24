const mongoose = require('mongoose')

const EntitySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    required: true,
    enum: ['sport', 'event', 'scene', 'lesson', 'song', 'fellowship'],
  },
  duration: Number,
  space: {
    type: String,
    enum: ['indoor', 'outdoor', 'both'],
  },
  age: {
    type: String,
    validate: {
      validator: v => /\d-\d/.test(v),
      message: '{VALUE} is not a valid age!',
    },
  },
  tags: [{ title: String }],
  images: [{ src: String }],
}, { timestamps: true })

const Entity = mongoose.model('Entity', EntitySchema)

module.exports = {
  Entity,
}

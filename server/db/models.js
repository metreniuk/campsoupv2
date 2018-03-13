const mongoose = require('mongoose')
const { entitySchema } = require('./schemes')

const Entity = mongoose.model('Entity', entitySchema)
// const football = new Entity({
//   title: 'football',
//   type: 'sport',
// })

// football.save()

module.exports = {
  Entity,
}

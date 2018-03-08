const mongoose = require('mongoose')
const dbConfigs = require('./.private_config.json')

const { dbUser, dbPassword } = dbConfigs

const connectToDb = () => {
  mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds261138.mlab.com:61138/campsoup`)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('connected!')
  })
  const entitySchema = mongoose.Schema({
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
        message: '{VALUE} is not a valid phone number!',
      },
    },
    tags: [{ title: String }],
    images: [{ src: String }],
  })
  const Entity = mongoose.model('Entity', entitySchema)
  const typicEvent = new Entity({ title: 'typicEvent', type: 'event', space: 'outdoor' })

  typicEvent.save()
    .then((entity) => {
      console.log(entity)
      console.log(`${entity.title} is saved!`)
    })
    .catch(err => console.error(err))
}

module.exports = {
  connectToDb,
}

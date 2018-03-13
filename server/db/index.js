const mongoose = require('mongoose')
const dbConfigs = require('../.private_config.json')
const { Entity } = require('./models')

const { dbUser, dbPassword } = dbConfigs

const connectToDb = () => {
  mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds261138.mlab.com:61138/campsoup`)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('connected!')
  })
}

module.exports = {
  connectToDb,
  Entity,
}

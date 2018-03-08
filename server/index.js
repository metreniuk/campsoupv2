const express = require('express')
const MongoClient = require('mongodb').MongoClient
const dbConfigs = require('./.private_config.json')

console.log(dbConfigs)

const app = express()

MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds261138.mlab.com:61138/campsoup', (err, db) => {
  if (err) throw err
  console.log('connected!')
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8080, () => console.log('Example app listening on port 8080!'))

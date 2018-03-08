const express = require('express')
const { connectToDb } = require('./db')

const app = express()

connectToDb()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(8080, () => console.log('Example app listening on port 8080!'))

const express = require('express')
const { router } = require('./router')
const { connectToDb } = require('./db')

const app = express()

connectToDb()

app.use(express.json())
app.use(router)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(8080, () => console.log('Example app listening on port 8080!'))

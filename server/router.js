const express = require('express')
// make it callable and DI
const passportService = require('./services/passport')
const { EntityController } = require('./controllers/entity')
const { AuthController } = require('./controllers/authentication')

const router = express.Router()

passportService.init()

router.use('/entity', EntityController)
router.use('/auth', AuthController)

module.exports = {
  router,
}

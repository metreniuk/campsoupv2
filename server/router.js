const express = require('express')
const { Entity } = require('./db')

const router = express.Router()

router.route('/entity/:entityType')
  .get((req, res) => {
    const { entityType } = req.params

    return Entity
      .find({ type: entityType })
      .then(result => res
        .status(200)
        .json({ result }))
      .catch(err => res.status(404).json(err))
  })

module.exports = {
  router,
}

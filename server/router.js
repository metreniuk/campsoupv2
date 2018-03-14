const express = require('express')
const R = require('ramda')
const { Entity } = require('./db')

const router = express.Router()

router.route('/entity/:entityType')
  .get((req, res) => {
    const { entityType } = req.params

    return Entity
      .find({ type: entityType })
      .then(result => res.status(200).json({ result }))
      .catch(err => res.status(404).json(err))
  })
  .post((req, res) => {
    const { body: { item } } = req
    const entity = new Entity(item)

    return entity.save()
      .then(savedEntity => res.status(201).json(savedEntity))
      .catch((err) => {
        const errorMessages = Object
          .values(err.errors)
          .map(R.prop('message'))
          .reduce(({ messages }, message) => ({
            messages: [...messages, message],
          }), { messages: [] })

        return res.status(400).json(errorMessages)
      })
  })

  // router.route('/entity/:entityType/:entityId')
  //   .get()

module.exports = {
  router,
}

const express = require("express")
const passport = require("passport")
const R = require("ramda")
const { Entity } = require("../models/entity")
const { Profile } = require("../models/profile")

const requireAuth = passport.authenticate("jwt", { session: false })

const router = express.Router()

const postEntity = (req, res) => {
  const { body: { item } } = req
  const entity = new Entity(item)

  return entity
    .save()
    .then(savedEntity => res.status(201).json(savedEntity))
    .catch(err => {
      const errorMessages = Object.values(err.errors)
        .map(R.prop("message"))
        .reduce(
          ({ messages }, message) => ({
            messages: [...messages, message],
          }),
          { messages: [] }
        )

      return res.status(400).json(errorMessages)
    })
}

router
  .route("/")
  .get((req, res) => {
    return Entity.find({})
      .then(items => res.status(200).json({ items }))
      .catch(err => res.status(404).json(err))
  })
  .post(postEntity)

router
  .route("/:entityType")
  .get((req, res) => {
    const { entityType } = req.params

    return Entity.find({ type: entityType })
      .then(items => res.status(200).json({ items }))
      .catch(err => res.status(404).json(err))
  })
  .post(postEntity)
// .post(requireAuth, (req, res) => {

router
  .route("/:entityType/:entityId")
  // returns null after deleting and in other weird cases???
  .get((req, res) => {
    const { entityId } = req.params

    return Entity.findById(entityId)
      .then(item => res.status(200).json(item))
      .catch(() =>
        res
          .status(404)
          .json({ message: `Entity with id: ${entityId} was not found!` })
      )
  })
  .patch(requireAuth, (req, res) => {
    const { body, params } = req
    const { entityId } = params
    const { item } = body

    return Entity.findByIdAndUpdate(entityId, item, {
      new: true,
      runValidators: true,
    })
      .then(result => res.status(200).json({ result }))
      .catch(() =>
        res
          .status(400)
          .json({ message: `Could not update entity with id: ${entityId}!` })
      )
  })
  .delete(requireAuth, (req, res) => {
    const { params } = req
    const { entityId } = params

    return Entity.findByIdAndRemove(entityId)
      .then(result => res.status(200).json({ result }))
      .catch(() =>
        res
          .status(400)
          .json({ message: `Could not remove entity with id: ${entityId}!` })
      )
  })

module.exports = {
  EntitiesController: router,
}

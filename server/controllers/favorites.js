// @flow
const express = require("express")
const passport = require("passport")
const R = require("ramda")
const { Profile } = require("../models/profile")

const requireAuth = passport.authenticate("jwt", { session: false })

const router = express.Router()

const createProfile = accountId => new Profile({ accountId })

const favoritesLens = R.lensProp("favorites")

const inspectCb = (s = "") => x => {
  console.log(s)
  console.log(x)
  return x
}

router
  .route("/:accountId")
  // returns null after deleting and in other weird cases???
  .get((req, res) => {
    const { accountId } = req.params

    return Profile.findOne({ accountId })
      .then(
        profile =>
          profile ? profile : Promise.reject({ message: "Account not found" })
      )
      .then(R.prop("favorites"))
      .then(item => res.status(200).json(item))
      .catch(
        err =>
          err.message
            ? res.status(404).json({ message: err.message })
            : res.status(404).json({
                message: `Profile with id: ${accountId} was not found!`,
              })
      )
  })
  .post((req, res) => {
    const { body: { entityId }, params: { accountId } } = req

    if (!entityId) {
      return res.status(400).json({ message: "Provide a valid entity id" })
    }

    Profile.findOne({ accountId })
      .then(profile => (profile ? profile : createProfile(accountId)))
      .then(profile => {
        if (!profile.favorites.includes(entityId)) {
          profile.favorites = [...profile.favorites, entityId]
        }
        return profile
      })
      .then(profile => profile.save())
      .then(savedProfile => res.status(201).json(savedProfile))
      .catch(err => {
        const errorMessages = Object.values(err.errors)
          .map(R.prop("message"))
          .reduce(
            ({ messages }, message) => ({
              messages: [...messages, message],
            }),
            { messages: [] }
          )

        return res.status(400).json(err)
      })
  })
  .delete((req, res) => {
    const { body: { entityId }, params } = req
    const { accountId } = params

    return Profile.findOne({ accountId })
      .then(
        profile =>
          profile ? profile : Promise.reject({ message: "Account not found" })
      )
      .then(profile => {
        if (profile.favorites.includes(entityId)) {
          let index = profile.favorites.indexOf(entityId)
          profile.favorites.splice(index, 1)
          return profile
        }
        return Promise.reject({ message: "No such entity in favorites" })
      })
      .then(profile => profile.save())
      .then(savedProfile => res.status(201).json(savedProfile))
      .catch(err => {
        console.log("ERROR ", err)
        return err.message
          ? res.status(404).json({ message: err.message })
          : res
              .status(400)
              .json({ message: `Could not remove the favorite entityId` })
      })
  })

module.exports = {
  FavoritesController: router,
}

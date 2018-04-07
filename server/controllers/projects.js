// @flow
const express = require("express")
// const passport = require("passport")
const R = require("ramda")
const { Project } = require("../models/project")
const { Day } = require("../models/day")

// const requireAuth = passport.authenticate("jwt", { session: false })

const router = express.Router()

const postProject = (req, res) => {
  const { body: { item } } = req
  const { days, title, user } = item

  Promise.resolve()
    .then(() => days.map(day => new Day(day)))
    .then(daysToSave => daysToSave.map(day => day.save()))
    .then(daysToSave => {
      console.log(daysToSave)
      return daysToSave
    })
    .then(savedDays => Promise.all(savedDays))
    .then(savedDays => {
      const days = savedDays.map(R.prop("id"))
      return new Project({ title, days, user }).save()
    })
    .then(savedProject => res.status(201).json(savedProject))
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
    return Project.find({})
      .then(items => res.status(200).json({ items }))
      .catch(err => res.status(404).json(err))
  })
  .post(postProject)

router
  .route("/:projectId")
  // returns null after deleting and in other weird cases???
  .get((req, res) => {
    const { projectId } = req.params

    return Project.findById(projectId)
      .then(item => {
        if (item) {
          return res.status(200).json(item)
        } else {
          throw new Error("not found")
        }
      })
      .catch(() =>
        res
          .status(404)
          .json({ message: `Project with id: ${projectId} was not found!` })
      )
  })
  .patch((req, res) => {
    const { body, params } = req
    const { projectId } = params
    const { item } = body

    return Project.findByIdAndUpdate(projectId, item, {
      new: true,
      runValidators: true,
    })
      .then(result => res.status(200).json({ result }))
      .catch(() =>
        res
          .status(400)
          .json({ message: `Could not update project with id: ${projectId}!` })
      )
  })
  .delete((req, res) => {
    const { params } = req
    const { projectId } = params

    return Project.findByIdAndRemove(projectId)
      .then(result => res.status(200).json({ result }))
      .catch(() =>
        res
          .status(400)
          .json({ message: `Could not remove project with id: ${projectId}!` })
      )
  })

module.exports = {
  ProjectsController: router,
}

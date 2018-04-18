const express = require("express")
const passport = require("passport")
const jwt = require("jwt-simple")
const { User } = require("../models/user")
const { jwtSecret } = require("../config.json")

const requireSignin = passport.authenticate("local", { session: false })

function generateToken(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, jwtSecret)
}

function signup(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ message: "Provide an email and a password" })
  }

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).json({ message: "This user already exists" })
      }

      const user = new User({ email, password })

      return user
        .save()
        .then(savedUser =>
          res
            .status(201)
            .json({
              token: generateToken(savedUser),
              id: savedUser.id,
              email: savedUser.email,
            })
        )
        .catch(() =>
          res.status(422).json({ message: "Could not save the user" })
        )
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }))
}

function signin(req, res) {
  let { user } = req
  let { id, email } = user
  return res.send({ token: generateToken(user), id, email })
}

const AuthController = express.Router()

AuthController.post("/signup", signup)
AuthController.post("/signin", requireSignin, signin)

module.exports = {
  AuthController,
}

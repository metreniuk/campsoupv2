const passport = require("passport")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const LocalStrategy = require("passport-local")
const { jwtSecret } = require("../config.json")
const { User } = require("../models/user")

function init() {
  const localOptions = { usernameField: "email" }
  const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        user
          .checkPassword(password)
          .then(isValid => done(null, isValid ? user : false))
          .catch(done)
      })
      .catch(done)
  })

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: jwtSecret,
  }
  const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub)
      .then(user => done(null, user || false))
      .catch(err => done(err, false))
  })

  passport.use(localLogin)
  passport.use(jwtLogin)
}

module.exports = {
  init,
}

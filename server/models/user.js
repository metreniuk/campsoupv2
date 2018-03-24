const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre("save", function presave(next) {
  bcrypt
    .genSalt()
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash
    })
    .then(next)
    .catch(next)
})

userSchema.methods.checkPassword = function check(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = {
  User,
}

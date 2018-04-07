const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema({
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

UserSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, item) => {
    delete item._id
    delete item.__v
    return item
  },
})

UserSchema.pre("save", function presave(next) {
  bcrypt
    .genSalt()
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash
    })
    .then(next)
    .catch(next)
})

UserSchema.methods.checkPassword = function check(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model("User", UserSchema)

module.exports = {
  User,
}

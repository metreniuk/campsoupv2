const mongoose = require("mongoose")

const ProfileSchema = mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    projects: [String],
    favorites: [String],
    tags: [String],
  },
  { timestamps: true }
)

ProfileSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, item) => {
    delete item._id
    delete item.__v
    return item
  },
})

const Profile = mongoose.model("Profile", ProfileSchema)

module.exports = {
  Profile,
}

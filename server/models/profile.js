const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileSchema = Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    projects: [String],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Entity" }],
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

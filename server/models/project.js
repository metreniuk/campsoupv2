const mongoose = require("mongoose")

const ProjectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    days: {
      type: [String],
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    tags: [String],
    images: [{ src: String }],
  },
  { timestamps: true }
)

ProjectSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, item) => {
    delete item._id
    delete item.__v
    return item
  },
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = {
  Project,
}

const mongoose = require("mongoose")

const EntitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    type: {
      type: String,
      required: true,
      enum: ["sport", "events", "scenes", "lessons", "songs", "fellowship"],
    },
    duration: Number,
    space: {
      type: String,
      enum: ["indoor", "outdoor", "both"],
    },
    age: {
      type: String,
      validate: {
        validator: v => /\d-\d/.test(v),
        message: "{VALUE} is not a valid age!",
      },
    },
    tags: [{ title: String }],
    images: [{ src: String }],
  },
  { timestamps: true }
)

EntitySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, entity) => {
    delete entity._id
    delete entity.__v
    return entity
  },
})

const Entity = mongoose.model("Entity", EntitySchema)

module.exports = {
  Entity,
}

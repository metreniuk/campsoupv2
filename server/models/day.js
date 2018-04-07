const mongoose = require("mongoose")

const DaySchema = mongoose.Schema(
  {
    title: String,
    description: String,
    entities: {
      type: [String],
      required: true,
    },
    tags: [String],
    images: [{ src: String }],
  },
  { timestamps: true }
)

DaySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, item) => {
    delete item._id
    delete item.__v
    return item
  },
})

const Day = mongoose.model("Day", DaySchema)

module.exports = {
  Day,
}

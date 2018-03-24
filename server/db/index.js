const mongoose = require("mongoose")
const dbConfigs = require("../config.json")

const { dbUser, dbPassword } = dbConfigs

const connectToDb = () => {
  mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds261138.mlab.com:61138/campsoup`)
  const db = mongoose.connection
  db.on("error", console.error.bind(console, "connection error:"))
  db.once("open", () => {
    console.log("Connected to DB!")
  })
}

module.exports = {
  connectToDb,
}

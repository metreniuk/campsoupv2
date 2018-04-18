const express = require("express")
// make it callable and DI
const passportService = require("./services/passport")
const { EntitiesController } = require("./controllers/entities")
const { AuthController } = require("./controllers/authentication")
const { ProjectsController } = require("./controllers/projects")
const { FavoritesController } = require("./controllers/favorites")

const router = express.Router()

passportService.init()

router.use("/entities", EntitiesController)
router.use("/auth", AuthController)
router.use("/projects", ProjectsController)
router.use("/favorites", FavoritesController)

module.exports = {
  router,
}

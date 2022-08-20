const router = require("express").Router()
const controllerIndex = require("../controllers/controllersIndex")


router.get("/", controllerIndex.tela)

module.exports = router
const router = require("express").Router()
const controller = require("../controllers/controllerCriarEmprestimo")


router.get("/", controller.tela)

module.exports = router
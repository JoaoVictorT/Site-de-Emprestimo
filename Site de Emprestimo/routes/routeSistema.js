const router = require("express").Router()
const controllerSistema = require("../controllers/controllersSistema")

router.get("/obterEmprestimoEntre/:credor/:devedor", controllerSistema.obterEmprestimoEntre)
router.delete("/quitarEmprestimo/:id/:senha", controllerSistema.quitarEmprestimo)
router.post("/criarEmprestimo/:valor/:devedor/:senhaDevedor/:credor/", controllerSistema.criarEmprestimo)


module.exports = router
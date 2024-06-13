const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController.js");

router.get("/", userController.indexScreen);
router.get("/editarUsuario/:id", userController.editarUsuarioScreen)
router.post("/editarUsuario/:id", userController.editarUsuario)
router.post("/cadastraruser", userController.cadastrarUsuario);
router.post("/validarUsuario", userController.validarUsuario);
router.get("/home", userController.verificarAuth, userController.homeview);
router.get("/sair", userController.logOut);

module.exports = router;
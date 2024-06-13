const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js");
const userController = require("../controllers/userController.js")

router.post("/cadastrar-produto",userController.verificarAuth, productController.cadastrarProduto);
router.post("/deletar/:id", productController.deleteProduct);
router.post("/editar/:id", productController.changeProduct);
router.get("/editar/:id", productController.changeProductScreen);

module.exports = router
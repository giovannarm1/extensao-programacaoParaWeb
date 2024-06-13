const Produto = require("../models/productModel");

async function cadastrarProduto(req, res){
    try {
        const produto = {
            nome: req.body.name,
            descricao: req.body.description,
            valor: req.body.value,
            usuario: req.session.user._id.toString()
        };

        
        await Produto.create(produto);
        console.log("produto criado");
        res.redirect('/home');

    } catch (err) {
        console.error(err);
        let erro_cadastrar_produto = true;
        res.render("home.html", { erro_cadastrar_produto });
    }
}

async function changeProductScreen(req, res){
    try {
    const produto = await Produto.findById(req.params.id);

    if (!produto) {
      let error_produto = true
      res.render("home.html", { erro_produto });
      return;
    }

    res.render('editarProduto.html', { produto });
  } catch (error) {
    console.error(error);
  }
}

async function changeProduct(req, res){
    try {
        const produto = await Produto.findById(req.params.id);

        produto.nome = req.body.nome;
        produto.descricao = req.body.descricao;
        produto.valor = req.body.valor;
    
        await produto.save();
    
        res.redirect('/home');
      } catch (error) {
        console.error(error);
      }
}

async function deleteProduct(req, res){
    try {
        const produto = await Produto.findOneAndDelete(req.params.id);
        res.redirect('/home');
      } catch (error) {
        console.error(error);
      }
}

module.exports = { 
    cadastrarProduto,
    changeProductScreen,
    changeProduct,
    deleteProduct
}
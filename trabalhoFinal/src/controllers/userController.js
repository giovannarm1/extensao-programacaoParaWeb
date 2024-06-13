const Usuario = require('../models/userModel');
const Produto = require('../models/productModel');

function indexScreen(req, res){
    res.render("index.html")
}

async function cadastrarUsuario(req, res){
    const User = {
        email: req.body.email,
        senha: req.body.senha 
    }

    try{
        const newUser = new Usuario(User);
        await newUser.save();
        let sucess = true;
        res.render('index.html', {sucess})
        console.log("Cadastrado com sucesso")
    } catch (err){
        let error = true;
        res.render('index.html', {error})
        console.error(err)
    }
}

async function editarUsuarioScreen(req, res){
    try {
        const usuario = await Usuario.findById(req.params.id);
        console.log(req.params.id)
        res.render('editarCadastro.html', { usuario });
      } catch (error) {
        console.error(error);
      }
}

async function editarUsuario(req, res){
    try {
        const usuario = await Usuario.findById(req.params.id);

        usuario.email = req.body.email;
        usuario.senha = req.body.senha;

        await usuario.save();

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
}

async function validarUsuario(req, res){
    const user = {
        email: req.body.email,
        senha: req.body.senha
    }

    try{
        const usuario = await Usuario.findOne({email: user.email, senha: user.senha})

        if(usuario !== null){
            req.session.autorizado = true
            req.session.user = usuario
            res.redirect("/home")
        } else {
            let auth_error = true
            res.render("index.html", {auth_error})
        }
    } catch {
        console.error(err)
    }
}

function verificarAuth(req, res, next) {
    if(req.session.autorizado){
        console.log("user autorizado");
        console.log(`id de sessão do user: ${req.session.user._id}`)
        next();
    }
    else{
        console.log("user não autorizado");
        res.redirect('/');
    }   
}

async function homeview(req, res) {
    try {
        if (!req.session.user) {  
            return res.redirect('/');  
        }
        
        const produtos = await Produto.find({usuario: req.session.user._id});

        const usuario = req.session.user._id

        console.log('Produtos Recuperados:', produtos);
        res.render('home.html', { produtos, usuario });
    } catch (erro_recupera_produtos) {
        console.error(erro_recupera_produtos);
        res.render('home.html', { erro_recupera_produtos });
    }
}

function logOut(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    indexScreen,
    cadastrarUsuario,
    editarUsuarioScreen,
    editarUsuario,
    validarUsuario,
    verificarAuth,
    homeview,
    logOut
}
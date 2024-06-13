const express = require("express");
const mustache = require("mustache-express");
const mongoose = require("mongoose");
const session = require("express-session");

//Conectar ao Mongo
const uri = 'mongodb+srv://staffgabs:1bSMgeulo84bjKDp@cluster0.m7acla7.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conexão bem-sucedida ao MongoDB Atlas!');
});

//Crirar aplicação e portas
const app = express();
const PORT = 8080;

// Configuração do mustache
app.engine('html', mustache())
app.set('view engine', 'html')
app.set('views', __dirname + '/src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//configurando sessao
app.use(session({
  secret: 'secret-token',
  name: 'sessionId',  
  resave: false,
  saveUninitialized: false
}));

// Rotas
app.use("/", require("./src/routes/userRoutes.js"));
app.use("/", require("./src/routes/productRoutes.js"))

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

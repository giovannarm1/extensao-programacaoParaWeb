const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    valor: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        ref: 'User',
        required: true
    }
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
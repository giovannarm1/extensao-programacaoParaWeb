

const express = require('express');
const calculadora = require('./util/calculadora');

const app = express();
const PORT = 3000;


app.get('/somar/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = calculadora.somar(a, b);
    res.send(`A soma de ${a} e ${b} é igual a ${resultado}`);
});


app.get('/subtrair/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = calculadora.subtrair(a, b);
    res.send(`A subtração de ${a} por ${b} é igual a ${resultado}`);
});


app.get('/multiplicar/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = calculadora.multiplicar(a, b);
    res.send(`A multiplicação de ${a} por ${b} é igual a ${resultado}`);
});


app.get('/dividir/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    if (b === 0) {
        res.status(400).send('Erro: divisão por zero');
    } else {
        const resultado = calculadora.dividir(a, b);
        res.send(`A divisão de ${a} por ${b} é igual a ${resultado}`);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

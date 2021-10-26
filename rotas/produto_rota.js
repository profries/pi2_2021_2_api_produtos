//Rota: /produtos (localhost:3000/produtos)

const express = require('express');
const rota = express.Router();

let listaProdutos = [];
let idGerador = 1;

//Roteamento do GET para http://localhost:3000/produtos
rota.get('/', (req, res) => {    
    res.json(listaProdutos);
});

//Roteamento do POST para http://localhost:3000/produtos
rota.post('/', (req, res) => {
    let produto = req.body;
    produto.id = idGerador++;

    listaProdutos.push(produto);

    res.status(201).send(produto);
});

//Roteamento do GET para http://localhost:3000/produtos/:id
rota.get('/:id', (req, res) => {
    const id = req.params.id;

    const produtoEncontrado = listaProdutos.find( 
        (prod) => prod.id == id
    );
    if(produtoEncontrado) {
        res.json(produtoEncontrado);
    }
    else {
        res.status(404).json({msg:"Produto nao encontrado"});
    }
});


//Roteamento do PUT para http://localhost:3000/produtos/:id
rota.put('/:id', (req, res) => {
    const id = req.params.id;
    const produtoAtualizar = req.body;

    const produtoEncontrado = listaProdutos.find( 
        (prod) => prod.id == id
    );
    if(produtoEncontrado) {
        produtoEncontrado.nome = produtoAtualizar.nome;
        produtoEncontrado.preco = produtoAtualizar.preco;
        res.json(produtoEncontrado);
    }
    else {
        res.status(404).json({msg:"Produto nao encontrado"});
    }

});

//Roteamento do DELETE para http://localhost:3000/produtos/:id
rota.delete('/:id', (req, res) => {
    const id = req.params.id;

    const indiceEncontrado = listaProdutos.findIndex( 
        (prod) => prod.id == id
    );

    if(indiceEncontrado > -1) {
        const produto = listaProdutos[indiceEncontrado];
        listaProdutos.splice(indiceEncontrado,1);
        res.json(produto);
    }
    else {
        res.status(404).json({msg:"Produto nao encontrado"});
    }
});

module.exports = rota;
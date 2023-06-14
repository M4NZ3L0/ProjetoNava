const Produtos = require("../models/products.js");
Produtos.sync();

const criarProduto = async (req,res) => {
    console.log(req.body)
    await Produtos.create({
        "Nome": req.body.Nome,
        "Descricao": req.body.Descricao,
        "Preco": req.body.Preco
    });
    res.json({"mensagem": "Produto criado"});

};

const getTodosProdutos = async (req,res) => {
    const todosProdutos = await Produtos.findAll();
    res.json(todosProdutos);
};

const getProduto = async (req,res) => {
    const id = req.params.id;
    const getProduto = await Produtos.findByPk(id);

    if(getProduto == null)
    {
        res.json({"mensagem":"Produto não encontrado"})
    }
    else
    {
        res.json(getProduto);
    }
};

const updateProduto = async (req,res) => {
    const id = req.params.id;
    const getProduto = await Produtos.findByPk(id);

    if(getProduto == null)
    {
        res.json({"mensagem":"Produto não encontrado"})
    }
    else
    {
        await getProduto.set({
            "Nome": req.body.Nome,
            "Descricao": req.body.Descricao,
            "Preco": req.body.Preco
        })

        await getProduto.save();

        res.json(getProduto)
    }
};

const deleteProduto = async (req,res) => {
    const id = req.params.id;
    const getProduto = await Produtos.findByPk(id);

    if(getProduto == null)
    {
        res.json({"mensagem": "Produto não exitente."});
    }
    else
    {
        await getProduto.destroy();
        res.json({"mensagem": "Produto deletado."});
    }
};

module.exports = {
    criarProduto,
    getTodosProdutos,
    getProduto,
    updateProduto,
    deleteProduto
}
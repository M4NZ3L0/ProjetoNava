const Produtos = require("../models/products.js");
Produtos.sync();

const criarProduto = async (req,res) => {
    console.log(req.body)
    await Produtos.create({
        "nome": req.body.nome,
        "descricao": req.body.descricao,
        "preco": req.body.preco,
        "autor_id": req.body.autor_id
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
            "nome": req.body.nome,
            "descricao": req.body.descricao,
            "preco": req.body.preco
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
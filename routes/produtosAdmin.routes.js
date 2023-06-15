const { Router } = require("express");
const Produtos = require("../models/products");
const Usuarios = require("../models/usuarios");
const { checkToken } = require("../middlewares/authCheck");
const router = Router();

router
    .get("/produtos", checkToken, async (req, res) => {
        const produtos = await Produtos.findAll();

        for (let i = 0; i < produtos.length; i++) {
            for (let z = 0; z + 1 < produtos.length; z++) {
                if (produtos[i].preco < produtos[z].preco) {
                    let aux = produtos[z];
                    produtos[z] = produtos[i];
                    produtos[i] = aux;
                }
            }
        }

        produtos.forEach(element => {
            console.log(element.preco);
        });

        const melhoresProdutos = produtos.slice(0, 4);

        res.render("pages/produtos/produtos", { title: "Produtos", css: "./css/produtos.css", produtos, melhoresProdutos });
    })
    .get("/produtos/:id", checkToken, async (req, res) => {

        const { id } = req.params;

        const produto = await Produtos.findByPk(id, { include: Usuarios });
        if (!produto) {
            console.log("Produto não encontrado");
            res.redirect("/produtos");
        }

        res.render("./pages/produtos/produto", { title: "Produtos", css: "./css/produtos.css", produto })
    })
    .get("/atualizarProduto/:id", checkToken, (req, res) => {
        res.render("./pages/produtos/atualizarProduto", { title: "Produtos", css: "./css/produtos.css" });
    })



    .post("/atualizarProduto/:id", checkToken, async (req, res) => {

        const { id } = req.params;

        if (!id) {
            res.json("O ID é necessário para verificação");
        }

        const produtoExiste = await Produtos.findOne({ where: { id } });

        if (!produtoExiste) {
            res.json("Produto não encontrado!");
        }

        let { nome, legenda, descricao, preco } = req.body;

        if (!nome) {
            nome = produtoExiste.nome;
        }

        if (!legenda) {
            legenda = produtoExiste.legenda;
        }

        if (!descricao) {
            descricao = produtoExiste.descricao;
        }
        if (!preco) {
            preco = produtoExiste.preco;
        }

        try {
            produtoExiste.nome = nome;
            produtoExiste.legenda = legenda;
            produtoExiste.descricao = descricao;
            produtoExiste.preco = preco;

            produtoExiste.save();
            res.redirect("/produtos");
        }
        catch (e) {
            res.send(e);
        }
    })




    .post("/deletarProduto/:id", checkToken, async (req, res) => {
        const { id } = req.params;

        const produto = await Produtos.findByPk(id);

        if (!produto) {
            console.log("Produto não existe");
            res.redirect("/produtos");
        }

        await produto.destroy();
        res.redirect("/produtos");

    })


module.exports = router;
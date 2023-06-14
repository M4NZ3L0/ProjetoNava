const {Router} = require("express");
const router = Router();

router
.get("/produtos", (req,res) => {
    res.render("base",{title:"Produtos",content:"./pages/produtos/produtos"});
})
.get("/produtosAdmin", (req,res) => {
    res.render("./pages/produtos/produtosAdmin");
})


module.exports = router;
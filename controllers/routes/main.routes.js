const {Router} = require("express");

const router = Router();

router.get("/", (req,res) => {
    res.render("index");
})
.get("/produtos", (req,res) => {
    res.render("produtos");
})
module.exports = router;
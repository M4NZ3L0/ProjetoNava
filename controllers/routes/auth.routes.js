const {Router} = require("express");

const router = Router();


router.get("/login", (req,res) => {
    res.render("login");
})
.get("/register", (req,res) => {
    res.render("register");
})
.post("/login", (req,res) => {
    res.send("Login")
})
.post("/register", (req,res) => {
    res.send("register")
})
module.exports = router;
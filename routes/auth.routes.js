const { Router } = require("express");
const authControllers = require("../controllers/auth.js");
const authMiddlewares = require("../middlewares/authCheck.js");

const router = Router();


router.get("/login", (req, res) => {
    res.render("./pages/auth/login");
})
    .get("/register", (req, res) => {
        res.render("./pages/auth/register");
    })
    .post("/login", authMiddlewares.checkLogin, authControllers.authLogin)
    .post("/register", authMiddlewares.checkRegister, authControllers.authRegister)
    .get("/logout", (req, res) => {
        res.send("logout")
    })
module.exports = router;
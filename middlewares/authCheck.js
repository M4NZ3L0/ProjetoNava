
//auth middlewares

const checkRegister = (req, res, next) => {

    const { name, email, password, confirm_password } = req.body;

    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    
    if (password.length < 8) {
        return res.status(422).json({ msg: "A senha precisa conter no minimo 8 carateres!" });
    }

    if (password != confirm_password) {
        return res
            .status(422)
            .json({ msg: "A senha e a confirmação precisam ser iguais!" });
    }

    next();
}

const checkLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    next();
}

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
    try {
      const secret = process.env.SECRET;
  
      jwt.verify(token, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }

module.exports = { checkLogin, checkRegister, checkToken}
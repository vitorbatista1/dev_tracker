const Usuario = require("../database/Schemas/usuarioSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const loginUser = async (req, res, next) => {
    try {
        const { email, senha } = req.body;
        const user = await Usuario.findOne({ email });
        const comparePassword = await bcrypt.compare(senha, user.senha)

        if (!user) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }

        if (!comparePassword) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }

        const id = user._id.toString();
        console.log(id)

        const token = jwt.sign({usuarioId:id, usuarioFuncao: user.funcao}, process.env.SECRET_KEY, {
            expiresIn: 300 // expira em 5 minutos
        });
        res.status(200).json({ auth: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ auth: false, token: null, message: 'Logout realizado com sucesso!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao realizar logout' });
    }
};

module.exports = { loginUser, logoutUser };
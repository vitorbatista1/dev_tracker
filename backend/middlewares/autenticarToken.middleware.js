const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, process.env.SECRET_KEY, (err, usuario) => {

    console.log("Token fornecido", token)
    console.log("Token guardado", process.env.SECRET_KEY)
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.usuario = usuario; 
    next();
  });
};
module.exports = { autenticarToken };
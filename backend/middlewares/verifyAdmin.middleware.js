const autorizarAdministrador = (req, res, next) => {

    console.log("Funcao", req.usuario.usuarioFuncao)
  if (req.usuario.usuarioFuncao !== 'Administrador') {
    return res.status(403).json({ error: 'Acesso negado: administrador somente' });
  }
  next();
};

module.exports = { autorizarAdministrador };    
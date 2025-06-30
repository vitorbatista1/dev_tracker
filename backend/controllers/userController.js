const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const usuarioSchema = require('../validators/usuarioValidator');

const createUser = async (req, res) => {
  try {
    const { error } = usuarioSchema.validate(req.body, { stripUnknown: true });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const dadosNovoUsuario = req.body;
    const senhaCriptografada = bcrypt.genSaltSync(10);
    dadosNovoUsuario.senha = bcrypt.hashSync(dadosNovoUsuario.senha, senhaCriptografada);
    const novoUsuario = await userService.createUser(dadosNovoUsuario);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};


const deleteUser = async (req, res) => {
  try{
    await userService.deleteUser(req.params.id)
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const usuarios = await userService.getAllUsers();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};


const editUser = async (req, res) => {
  try {
    const { error, value } = usuarioSchema.validate(req.body, { stripUnknown: true });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedUser = await userService.editUser(req.params.id, value);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  editUser,
  deleteUser
};

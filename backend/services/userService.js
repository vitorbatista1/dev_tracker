const Usuario = require("../database/Schemas/usuarioSchema");


const createUser = async (user) => {
    const novoUsuario = new Usuario(user);
    await novoUsuario.save();
    return novoUsuario;
};

const getAllUsers = async () => {
    const usuarios = await Usuario.find();
    return usuarios;
};

const editUser = async (id, user) => {
  const updatedUser = await Usuario.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
};

module.exports = {createUser, getAllUsers, editUser};
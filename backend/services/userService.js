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

const deleteUser = async (id) => {
  const deletedUser = await Usuario.findByIdAndDelete(id);
  return deletedUser;
};

const editUser = async (id, userData) => {
  const updatedUser = await Usuario.findByIdAndUpdate(id, userData, { new: true });
  return updatedUser;
};

module.exports = {createUser, getAllUsers, editUser, deleteUser};
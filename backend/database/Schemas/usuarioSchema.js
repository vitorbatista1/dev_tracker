const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  cargo: String,
  departamento: String,
  data_contratacao: Date
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

const Joi = require('joi');

const usuarioSchema = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    'string.base': 'nome deve ser uma string',
    'string.empty': 'nome não pode ser vazio',
    'string.min': 'nome deve ter pelo menos 3 caracteres',
    'any.required': 'nome é obrigatório'
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'email deve ser um endereço de email válido',
    'any.required': 'email é obrigatório'
  }),

  senha: Joi.string().min(6).required().messages({
    'string.min': 'senha deve ter pelo menos 6 caracteres',
    'any.required': 'o campo senha é obrigatório'
  }),

  departamento: Joi.string().required().messages({
    'any.required': 'departamento é obrigatório e não pode estar vazio'
  })
});

module.exports = usuarioSchema;

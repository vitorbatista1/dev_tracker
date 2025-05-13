const express = require('express');
const cors = require('cors');
const Usuario = require('./database/Schemas/usuarioSchema');
const connectDB = require('./database/config.js');
const usuarioSchema = require('./validators/usuarioValidator.js');
const app = express();
const port = 8080;
connectDB();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/users', async (req, res) => {
  try {

    const { error } = usuarioSchema.validate(req.body, { stripUnknown: true });

    if (error) {
      return res.status(400).json({ message: error.message });
        }

    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();

    res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await Usuario.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar usuários');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

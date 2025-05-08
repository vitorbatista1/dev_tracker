const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Usuario = require('./database/Schemas/usuarioSchema');
const app = express();

const port = 5000;


// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/devTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Middleware para ler JSON
app.use(cors())
app.use(express.json());


// Rotas
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/newUser', (req, res) => {
  const novoUsuario = new Usuario(req.body);
  novoUsuario.save()
    .then(() => res.status(201).send({ message: 'Usuário cadastrado com sucesso!' }))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erro ao cadastrar usuário');
    });
});

app.get('/users', (req, res) => {
  Usuario.find()
    .then(users => res.send(users))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    }); 
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

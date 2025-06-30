const express = require('express');
const cors = require('cors');
const connectDB = require('./database/config.js');

const app = express();
const port = 8080;

connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/loginRoutes'));


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

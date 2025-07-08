require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');               // ⬅️ Adicionado
const { Server } = require('socket.io');    // ⬅️ Adicionado

const sensoresRoutes = require('./routes/sensores.routes');

const app = express();
const server = http.createServer(app); // ⬅️ Substitui app.listen()
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tornar o socket.io acessível em req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(sensoresRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

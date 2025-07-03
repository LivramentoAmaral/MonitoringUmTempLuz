require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sensoresRoutes = require('./routes/sensores.routes');

const app = express();
const PORT = process.env.PORT || 8000 ;
const MONGO_URI = process.env.MONGO_URI || '' ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sensoresRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

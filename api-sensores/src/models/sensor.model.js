const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  temperatura: { type: Number, required: true },
  umidade: { type: Number, required: true },
  luminosidade: { type: Number, required: true },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sensor', SensorSchema);

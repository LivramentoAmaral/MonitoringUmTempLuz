
const Sensor = require('../models/sensor.model');

exports.create = async (req, res) => {
  try {
    const { temperatura, umidade, luminosidade } = req.body;

    if (
      temperatura === undefined ||
      umidade === undefined ||
      luminosidade === undefined
    ) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }

    const sensor = new Sensor({ temperatura, umidade, luminosidade });
    await sensor.save();

    // 🔥 Emitir evento via WebSocket
    req.io.emit('novo-dado', sensor); 

    res.status(201).json({ message: 'Dados salvos com sucesso', sensor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar dados' });
  }
};


// quero de get todos os sensores
exports.findAll = async (req, res) => {
  try {
    const sensores = await Sensor.find().sort({ data: -1 });
    res.status(200).json(sensores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar sensores' });
  }
}


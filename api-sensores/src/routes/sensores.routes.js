const express = require('express');
const router = express.Router();
const sensoresController = require('../controllers/sensores.controller');

router.post('/api/sensores', sensoresController.create);
router.get('/api/sensores', sensoresController.findAll);

module.exports = router;

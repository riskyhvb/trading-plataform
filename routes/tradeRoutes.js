const express = require('express');
const router = express.Router();
const { createTrade, getAccounts } = require('../controllers/tradeController'); // Asegúrate de que los controladores estén importados correctamente
const authMiddleware = require('../middlewares/authMiddleware'); // Asegúrate de que el middleware esté importado correctamente

// Ruta para crear una nueva operación de trading (requiere autenticación)
router.post('/create', authMiddleware, createTrade);

// Ruta para obtener las cuentas de trading (requiere autenticación)
router.get('/accounts', authMiddleware, getAccounts);

module.exports = router;

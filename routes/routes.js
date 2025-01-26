const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');  // Ruta al controlador

// Ruta para agregar una nueva cuenta
router.post('/addAccount', accountController.addAccount);

// Ruta para obtener todas las cuentas
router.get('/getAccounts', accountController.getAccounts);

module.exports = router;

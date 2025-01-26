const express = require('express');
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware para verificar token JWT
const router = express.Router();

// Ruta para obtener las cuentas del usuario
router.get('/', authMiddleware.verifyToken, accountController.getAccounts);

module.exports = router;

const Account = require('../models/Account');

// Obtener las cuentas del usuario
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.userId });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las cuentas', error });
  }
};

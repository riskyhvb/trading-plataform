// controllers/tradeController.js

exports.createTrade = async (req, res) => {
  try {
    const trade = req.body;  // Aquí iría la lógica para crear un nuevo trade
    // Simulamos la creación de un trade
    res.status(201).json({ message: 'Trade creado exitosamente', trade });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el trade', error: error.message });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    // Aquí iría la lógica para obtener las cuentas de trading del usuario autenticado
    const accounts = [
      { name: 'Cuenta 1', balance: 1000 },
      { name: 'Cuenta 2', balance: 5000 },
    ]; // Esto debería ser consultado de la base de datos
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las cuentas', error: error.message });
  }
};

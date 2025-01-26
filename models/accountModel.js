const mongoose = require('mongoose');

// Crear el esquema de cuenta de trading
const accountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountBalance: { type: Number, required: true },
  totalTrades: { type: Number, required: true },
  maxDrawdown: { type: Number, required: true },
  maxProfit: { type: Number, required: true }
});

// Crear el modelo para la cuenta de trading
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;

const mongoose = require('mongoose');

// Esquema para el modelo de una operación de trading
const tradeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['buy', 'sell'], 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  symbol: { 
    type: String, 
    required: true 
  },
  totalValue: { 
    type: Number, 
    required: true,
    default: function() {
      return this.amount * this.price;  // Calcula el valor total de la transacción
    }
  },
  result: { 
    type: String, 
    enum: ['profit', 'loss', 'neutral'], 
    default: 'neutral' 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  // Otros campos que podrías querer agregar para auditar
  fees: { 
    type: Number, 
    default: 0 
  },
  exchange: { 
    type: String, 
    default: 'Binance' // o cualquier otra plataforma
  }
});

// Creamos el modelo con el esquema de arriba
const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;

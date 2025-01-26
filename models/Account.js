const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountName: { type: String, required: true },
  balance: { type: Number, required: true },
  currency: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);

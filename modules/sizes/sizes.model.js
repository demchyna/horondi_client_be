const mongoose = require('mongoose');

const sizesSchema = new mongoose.Schema({
  name: String,
  heightInCm: Number,
  widthInCm: Number,
  depthInCm: Number,
  volumeInLiters: Number,
  weightInKg: Number,
  available: Boolean,
  additionalPrice: [CurrencySet],
});

module.exports = mongoose.model('Sizes', sizesSchema);
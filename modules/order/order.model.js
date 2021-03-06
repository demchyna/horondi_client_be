const mongoose = require('mongoose');
const Language = require('../../models/Language').schema;
const CurrencySet = require('../../models/CurrencySet').schema;
const Address = require('../common/Address').schema;

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: [
      'CREATED',
      'CONFIRMED',
      'PRODUCED',
      'CANCELLED',
      'REFUNDED',
      'SENT',
      'DELIVERED',
    ],
    default: 'CREATED',
  },
  user: {
    firstName: String,
    lastName: String,
    patronymicName: String,
    email: String,
    phoneNumber: Number,
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedDate: Date,
  userComment: {
    type: String,
    default: '',
  },
  adminComment: {
    type: String,
    default: '',
  },
  cancellationReason: {
    type: String,
    default: '',
  },
  delivery: {
    sentOn: Date,
    sentBy: String,
    byCourier: Boolean,
    courierOffice: Number,
    invoiceNumber: String,
    cost: [CurrencySet],
  },
  address: Address,
  items: [
    {
      category: [Language],
      subcategory: [Language],
      model: [Language],
      name: [Language],
      colors: [[Language]],
      pattern: [Language],
      closure: [Language],
      closureColor: String,
      size: {
        heightInCm: Number,
        widthInCm: Number,
        depthInCm: Number,
        volumeInLiters: Number,
        weightInKg: Number,
      },
      bottomMaterial: [Language],
      bottomColor: [Language],
      additions: [[Language]],
      actualPrice: [CurrencySet],
      quantity: Number,
    },
  ],
  totalItemsPrice: [CurrencySet],
  totalPriceToPay: [CurrencySet],
  paymentMethod: {
    type: String,
    required: true,
    enum: ['CARD', 'CASH'],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Order', orderSchema);

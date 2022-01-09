const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema( {
  // Schema attributes are defined here
  cart: Object,
  account: Object,
  shipping_fee: Number,
  subtotal_price: Number,
  payment: String,
  discount: String,
  note: String
}, { timestamps: true, versionKey: false });

// Create order model in db
module.exports = mongoose.model('checkout', checkoutSchema, 'checkout');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema
 */
const productSchema = new Schema({
  // Schema attributes are defined here
  name: { type: String },
  CPU: String,
  RAM: String,
  disk: String,
  graphic_card: { type: String },
  screen: String,
  port: String,
  optical_disk: { type: String },
  audio: String,
  keyboard: String,
  read_mem_card: { type: String },
  LAN: String,
  WIFI: String,
  bluetooth: String,
  webcam: String,
  os: String,
  pin: String,
  weight: Number,
  color: String,
  size: String,
  origin: String,
  price: Number,
  producer: String,
  stock: Number,
  discount: mongoose.Types.ObjectId,
  offer: mongoose.Types.ObjectId
}, { timestamps: true, versionKey: false });


module.exports = mongoose.model('product', productSchema, 'product');
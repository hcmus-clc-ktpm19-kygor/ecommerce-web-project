const db = require('../config/database');
const { DataTypes } = require("sequelize");

const order = db.define('orders', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
  },

  orderName: {
    filed: 'order_name',
    type: DataTypes.STRING
  },

  orderStatus: {
    filed: 'order_status',
    type: DataTypes.STRING
  },

  shippingFee: {
    field: 'shipping_fee',
    type: DataTypes.DECIMAL(10, 3)
  },

  price: { type: DataTypes.DECIMAL(15, 3) },

  address: { type: DataTypes.STRING },

  customerId: {
    field: 'customer_id',
    type: DataTypes.STRING
  },

  payment: { type: DataTypes.STRING },
}, {
  tableName: 'orders'
});

module.exports = order;
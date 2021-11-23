const db = require('../config/database');
const { DataTypes } = require("sequelize");

const OrderDetail = db.define('OrderDetail', {
  // Model attributes are defined here
  orderId: {
    field: 'order_id',
    primaryKey: true,
    type: DataTypes.STRING
  },

  productId: {
    filed: 'product_id',
    primaryKey: true,
    type: DataTypes.STRING
  },

  quantity: { type: DataTypes.INTEGER }

}, {
  tableName: 'order_detail'
});

module.exports = OrderDetail;
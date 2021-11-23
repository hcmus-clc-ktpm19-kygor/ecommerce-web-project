const db = require('../config/database');
const { DataTypes } = require("sequelize");

const product = db.define('product', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    filed: 'product_name',
    type: DataTypes.STRING,
  },

  stock: { type: DataTypes.INTEGER },

  price: { type: DataTypes.DECIMAL(15, 3) }
}, {
  tableName: 'product'
});

module.exports = product;
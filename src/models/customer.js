const db = require('../config/database');
const { DataTypes } = require("sequelize");

const customer = db.define('customer', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },

  fullName: { type: DataTypes.STRING },

  phoneNumber: {
    filed: 'phone_number',
    type: DataTypes.STRING
  },

  email: { type: DataTypes.STRING },

}, {
  tableName: 'customer'
});

module.exports = customer;
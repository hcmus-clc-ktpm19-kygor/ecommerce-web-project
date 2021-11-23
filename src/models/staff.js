const db = require('../config/database');
const { DataTypes } = require("sequelize");

const staff = db.define('staff', {
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

  address: { type: DataTypes.STRING },

  email: { type: DataTypes.STRING },

}, {
  tableName: 'staff'
});

module.exports = staff;
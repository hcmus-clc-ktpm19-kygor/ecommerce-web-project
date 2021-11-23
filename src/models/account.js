const db = require('../config/database');
const { DataTypes } = require("sequelize");

const account = db.define('account', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },

  username: { type: DataTypes.STRING },

  password: { type: DataTypes.STRING },

  accountStatus: {
    field: 'account_status',
    type: DataTypes.BOOLEAN
  },

}, {
  tableName: 'account'
});

module.exports = account;
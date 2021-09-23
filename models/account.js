const { DataTypes } = require('sequelize');
const db = require('../db');

const Account = db.define('account', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  accountID: {
    type: DataTypes.STRING,
    allowNul: true,
  },
  customerNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignmentDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primaryXCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Account;

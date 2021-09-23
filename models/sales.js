const { DataTypes } = require('sequelize');
const db = require('../db');

const Sales = db.define('sales', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  ppcSales: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  segment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ats: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salesChannel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  primarySales: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Sales;

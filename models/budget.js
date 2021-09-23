const { DataTypes } = require('sequelize');
const db = require('../db');

const Budget = db.define('budget', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  spendAsOf: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  budgetAmount: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  spend: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  rollerOver: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  buPercentage: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  credits: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
});

module.exports = Budget;

const { DataTypes } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderType: {
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
  campaignStartDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  totalDays: {
    type: DataTypes.INTEGER,
  },
  daysIn: {
    type: DataTypes.INTEGER,
    allowNul: true,
  },
  daysRemaining: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  orderAmount: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  spendAsOfDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  budgetSpent: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  dailyPacing: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  cbu: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  contractType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Order;

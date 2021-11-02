const { DataTypes } = require('sequelize');
const db = require('../db');

const IO = db.define('io', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  agencyIO: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ioBudget: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  ioSpend: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
});

module.exports = IO;

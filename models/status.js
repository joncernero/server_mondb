const { DataTypes } = require('sequelize');
const db = require('../db');

const Status = db.define('status', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  atRiskAtOnset: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountState: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  introStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  health: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  churnDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  closeNotes: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

module.exports = Status;

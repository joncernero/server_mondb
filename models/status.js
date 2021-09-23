const { DataTypes } = require('sequelize');
const db = require('../db');

const Status = db.define('status', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  atRiskAtOnset: {
    type: DataTypes.BOOLEAN,
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
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  closeNotes: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

module.exports = Status;

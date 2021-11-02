const { DataTypes } = require('sequelize');
const db = require('../db');

const Campaign = db.define('campaign', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  campaignMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kpiRank: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kpiNotes: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  onsetNotes: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  pacing: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Campaign;

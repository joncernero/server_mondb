const { DataTypes } = require('sequelize');
const db = require('../db');

const Implementation = db.define('implementation', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  mobileOptimized: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  jobsURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pixelStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  sourceTag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bidOptimizer: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  awm: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  military: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  ejb: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  guid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eligibleForFree: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Implementation;

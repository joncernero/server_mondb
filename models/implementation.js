const { DataTypes } = require('sequelize');
const db = require('../db');

const Implementation = db.define('implementation', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  mobileOptimized: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jobsURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pixelStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sourceTag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bidOptimizer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  awm: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  military: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ejb: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  guid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eligibleForFree: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Implementation;

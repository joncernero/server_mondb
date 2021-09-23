const { DataTypes } = require('sequelize');
const db = require('../db');

const Provider = db.define('provider', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  providerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  providerCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  providerId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  providerType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jobSource: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vendorSource: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Provider;

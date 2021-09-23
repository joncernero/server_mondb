const { DataTypes } = require('sequelize');
const db = require('../db');

const Agency = db.define('agency', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  agencyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Agency;

const { DataTypes } = require('sequelize');
const db = require('../db');

const Engagement = db.define('engagement', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  engagementNote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Engagement;

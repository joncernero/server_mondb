const { DataTypes } = require('sequelize');
const db = require('../db');

const Engagement = db.define('engagement', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  engagementNote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = Engagement;

const { DataTypes } = require('sequelize');
const db = require('../db');

const WeeklyUpdate = db.define('update', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  weeklyUpdate: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  jobCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  activeCampaigns: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = WeeklyUpdate;

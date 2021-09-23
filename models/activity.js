const { DataTypes } = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  activityNotes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = Activity;

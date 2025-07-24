const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Assuming User model is in this path

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdby: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true,
});

module.exports = Team;

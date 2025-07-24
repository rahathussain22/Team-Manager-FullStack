const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Team = require('./team');
const User = require('./user');

const TeamMember = sequelize.define('TeamMember', {
  teamId: {
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id'
    },
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = TeamMember;

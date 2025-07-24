const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Team = require('./team');

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdby: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id'
    },
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  iscompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
});

module.exports = Task;

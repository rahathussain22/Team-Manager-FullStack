const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a sequelize instance

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refreshtoken: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  timestamps: true
});

module.exports = User;

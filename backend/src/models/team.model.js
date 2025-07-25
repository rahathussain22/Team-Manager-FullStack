import { DataTypes } from 'sequelize';
const sequelize = require('../db/connectdb.js'); 

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdby: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamps: true,
});

export {Team}

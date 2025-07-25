import { DataTypes } from 'sequelize';
const sequelize = require('../db/connectdb.js'); 

const TeamMember = sequelize.define('TeamMember', {
  teamId: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Team,
    //   key: 'id'
    // },
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: User,
    //   key: 'id'
    // },
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export {TeamMember}

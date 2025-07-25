import { DataTypes } from 'sequelize';
const sequelize = require('../db/connectdb.js'); 


const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdby: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: User,
    //   key: 'id'
    // },
    allowNull: false
  },
  teamId:{
    type:DataTypes.INTEGER,
    allowNull: true
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Team,
    //   key: 'id'
    // },
    allowNull: true
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

export {Task}

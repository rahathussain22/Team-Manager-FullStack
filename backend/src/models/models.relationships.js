const User = require('./user');
const Team = require('./team');
const TeamMember = require('./teamMember');
const Task = require('./task');

// Associations

// A User can create many Teams
User.hasMany(Team, { foreignKey: 'createdby' });
Team.belongsTo(User, { foreignKey: 'createdby' });

// A User can create many Tasks
User.hasMany(Task, { foreignKey: 'createdby' });
Task.belongsTo(User, { foreignKey: 'createdby' });

// A Team can have many TeamMembers, but a TeamMember belongs to one Team
Team.hasMany(TeamMember, { foreignKey: 'teamId' });
TeamMember.belongsTo(Team, { foreignKey: 'teamId' });

// A User can belong to only one Team through TeamMember (One-to-One)
User.hasOne(TeamMember, { foreignKey: 'userId' });  // This ensures a user can only belong to one team at a time
TeamMember.belongsTo(User, { foreignKey: 'userId' });

// A Team can have many Tasks
Team.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(Team, { foreignKey: 'assignedTo' });

module.exports = { User, Team, TeamMember, Task };

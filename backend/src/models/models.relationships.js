import { Team } from "./team.model.js";
import { User } from "./user.model.js";
import { Task } from "./task.model.js";
import { TeamMember } from "./teamMember.model.js";


Team.belongsTo(User, {foreignKey: 'createdby', as: 'owner' } )
User.hasMany(Team, {foreignKey: 'createdby', as: 'teamsCreated' } )

Task.belongsTo(Team, {foreignKey: 'teamId', as: 'subjectedTo' } )
Team.hasMany(Task, {foreignKey: 'teamId', as: 'assignedTasks' })

Task.belongsTo(User, {foreignKey: 'assignedTo', as: 'userAssigned'})
User.hasMany(Task, {foreignKey: 'assignedTo', as : 'assignedTasks'})

Task.belongsTo(User, {foreignKey: 'createdBy', as: 'taskCreatedBy'})
User.hasMany(Task, {foreignKey: 'createdBy', as: 'totalCreatedTasks'})

TeamMember.belongsTo(Team, {foreignKey: 'teamId', as: 'teamAssigned'})
Team.hasMany(TeamMember, {foreignKey: 'teamId'})

User.hasOne(TeamMember, { foreignKey: 'userId', as : 'memberOf' });  // This ensures a user can only belong to one team at a time
TeamMember.belongsTo(User, { foreignKey: 'userId', as : 'member' });
// Associations

// // A User can create many Teams
// User.hasMany(Team, { foreignKey: 'createdby' });
// Team.belongsTo(User, { foreignKey: 'createdby' });

// // A User can create many Tasks
// User.hasMany(Task, { foreignKey: 'createdby' });
// Task.belongsTo(User, { foreignKey: 'createdby' });

// // A Team can have many TeamMembers, but a TeamMember belongs to one Team
// Team.hasMany(TeamMember, { foreignKey: 'teamId' });
// TeamMember.belongsTo(Team, { foreignKey: 'teamId' });

// // A User can belong to only one Team through TeamMember (One-to-One)


// // A Team can have many Tasks
// Team.hasMany(Task, { foreignKey: 'assignedTo' });
// Task.belongsTo(Team, { foreignKey: 'assignedTo' });

export { User, Team, TeamMember, Task };

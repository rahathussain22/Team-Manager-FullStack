import { asyncHandler } from "../utils/asyncHandler.js"
import { Team } from "../models/team.model.js"
import { TeamMember } from "../models/teamMember.model.js";
import options from "sequelize/lib/operators";
import { APIError } from "../utils/apiError.js";


const createTeam= asyncHandler( async (req, res)=>{
    const{name, createdBy}= req.body;
      if (!name || !createdBy) {
        throw new APIError(400, "provide all fields")
    }

    const teamExist = await Team.findOne({ where: { name: name } })

    if (teamExist!=null) {
        throw new ApiError(409, "Team already exist with this name")
    } 
     
   await Team.create({
        name,
        createdBy: createdBy
    })
   
   res.status(200).json({
      status: "success",
    message: "Team created"
 })
})
const removeTeam = asyncHandler(async (req, res) => {
  const { createdBy, teamId } = req.body;
  // Step 1: Validate input
  if (!teamId || !createdBy) {
    throw new APIError(400, "Please provide a teamId to delete");
  }
  // Step 2: Fetch the team instance
  const team = await Team.findByPk(teamId);

  if (!team) {
    throw new APIError(404, "Team not found");
  }
  if(team.createdBy!=createdBy){
    throw new APIError(403,"Only creator can Delete or Update team")
  }
  // Step 3: Destroy all team member records first (optional, based on your logic)
  await TeamMember.destroy({
    where: { teamId },
    transaction: options.transaction,
  });
  // Step 4: Destroy the team
  await team.destroy();  // This triggers the beforeDestroy hook

  // Step 5: Send a success response
  res.status(200).json({
    message: "Team and its members deleted successfully"
  });
});

export {createTeam, removeTeam}
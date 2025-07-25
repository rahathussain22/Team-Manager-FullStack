import { asyncHandler } from "../utils/asyncHandler.js";
const createTeam= asyncHandler( async (req, res)=>{
     res.status(200).json({
    message: "Ok"
 })
})

export {createTeam}
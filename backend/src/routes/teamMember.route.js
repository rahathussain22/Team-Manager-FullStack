import { Router } from "express";
import {addTeamMember, removeTeamMember} from "../controllers/teamMember.controller.js"
const router = Router()
router.route("/addTeamMember").post(addTeamMember)
router.route("/removeTeamMember").post(removeTeamMember)
export default router
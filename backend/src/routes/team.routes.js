import {createTeam, getAllTeams, removeTeam} from "../controllers/team.controller.js"
import { Router } from "express"
const router = Router()

router.route("/createTeam").post(createTeam)
router.route("/removeTeam").post(removeTeam)
router.route("/getTeam").get(getAllTeams)
export default router

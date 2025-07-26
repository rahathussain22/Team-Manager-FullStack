import {createTeam, removeTeam} from "../controllers/team.controller.js"
import { Router } from "express"
const router = Router()

router.route("/createTeam").post(createTeam)
router.route("/removeTeam").post(removeTeam)
export default router

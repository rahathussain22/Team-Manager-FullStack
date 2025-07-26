import { Router } from "express";
import {createTask, deleteTask, updateTask} from "../controllers/task.controller.js"

const router = Router()

router.route("/createTask").post(createTask)
router.route("/deleteTask").post(deleteTask)
router.route("/updateTask").post(updateTask)
export default router
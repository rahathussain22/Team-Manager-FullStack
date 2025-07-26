import { Router } from "express";
import {assignTask, createTask, deleteTask, updateTask} from "../controllers/task.controller.js"

const router = Router()

router.route("/createTask").post(createTask)
router.route("/assignTask").post(assignTask)
router.route("/deleteTask").post(deleteTask)
router.route("/updateTask").post(updateTask)
export default router
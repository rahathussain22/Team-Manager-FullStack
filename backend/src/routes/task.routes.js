import { Router } from "express";
import {assignTask, createTask, deleteTask, getAllTasks, updateTask} from "../controllers/task.controller.js"

const router = Router()

router.route("/createTask").post(createTask)
router.route("/assignTask").post(assignTask)
router.route("/deleteTask").post(deleteTask)
router.route("/updateTask").post(updateTask)
router.route("/getTask").post(getAllTasks)
export default router
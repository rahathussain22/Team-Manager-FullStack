import { Task } from "../models/task.model.js";
import { APIError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {

    const { name, createdBy, deadline, assignedTo } = req.body;

    if (!name || !createdBy || !deadline) {
        throw new APIError(400, "Please add the required information");
    }

    await Task.create({
        name,
        createdBy,
        assignedTo: assignedTo? assignedTo: null,
        deadline: new Date(deadline)
    });

    res.status(200).json({
        message: " Task Successfully created"
    })

})
const assignTask = asyncHandler(async (req, res) => {
    const { taskId, teamId } = req.body;

    if (!taskId || !teamId) {
        throw new APIError(400, "Please provide both task ID and Team ID to assign");
    }

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw new APIError(404, "Task not found");
    }

    // Check if the task is already assigned to the same team
    if (task.assignedTo === teamId) {
        throw new APIError(400, "Task is already assigned to this team");
    }

    // Update task's assignedTo field
    task.assignedTo = teamId;
    await task.save();

    res.status(200).json({
        message: "Task successfully assigned to the team",
        task
    });
});
const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body;

    // Step 1: Validate input
    if (!taskId) {
        throw new APIError(400, "Please provide task ID to delete");
    }

    // Step 2: Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw new APIError(404, "Task not found");
    }

    // Step 3: Destroy the task
    await task.destroy();
    res.status(200).json({
        message: "task deleted successfully"
    })
})
const updateTask = asyncHandler(async (req, res) => {
       const { name, deadline, assignedTo, taskId } = req.body;

    if (!taskId) {
        throw new APIError(400, "Please provide task ID");
    }

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw new APIError(404, "Task not found");
    }

    // Update fields
    if (name) task.name = name;
    if (deadline) task.deadline = new Date(deadline);
    if (assignedTo !== undefined) task.assignedTo = assignedTo; // check for null/undefined

    await task.save();
    res.status(200).json({
        message: "Task Updated Successfully"
    })
})
export { createTask, deleteTask, updateTask, assignTask }
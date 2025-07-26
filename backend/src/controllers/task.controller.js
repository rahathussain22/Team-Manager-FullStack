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
const deleteTask = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})
const updateTask = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})
export { createTask, deleteTask, updateTask }
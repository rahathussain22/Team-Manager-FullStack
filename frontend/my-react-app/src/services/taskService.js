import axios from "axios"
import { API_URL } from "../Constants"
export const getTask = async () => {

    const loggedInUser = JSON.parse(localStorage.getItem("user"))

    const response = await axios.get(`${API_URL}/Task/getTask/${loggedInUser.id}`)
    return response

}
export const createTask = async (name, deadline) => {

    try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"))
        const requestBody = {
            name: name,
            createdBy: loggedInUser.id,
            deadline: deadline
        }
        const response = await axios.post(`${API_URL}/Task/createTask`, requestBody)
        return response
    } catch (error) {
        throw error
    }


}
export const deleteTask = async (taskId) => {

    try {
         const loggedInUser = JSON.parse( localStorage.getItem("user") )
        const requestBody = {
            taskId: taskId,
            userId: loggedInUser.id,

        }
        const response = await axios.post(`${API_URL}/Task/deleteTask`, requestBody)
        return response
    } catch (error) {
        throw error
    }


}
export const assignTask=async (taskId, teamId)=>{
    const requestBody= {
        taskId:taskId,
        teamId:teamId
    }
    try {
         const response= await axios.post(`${API_URL}/Task/assignTask`,requestBody)
         return response
    } catch (error) {
        console.log("Error", error)
    }
   
}
export const getAllTasks = async () => {

    try {
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await axios.get(`${API_URL}/Task/getTask/${user.id}`)
        return response
    } catch (error) {
        throw error
    }
}
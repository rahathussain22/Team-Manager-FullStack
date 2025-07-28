import { API_URL } from "../Constants";
import axios from "axios";
export const createTeam = async(name,createdBy)=>{
    try {
        const requestBody = {
            name,
            createdBy
        }
        const response = await axios.post(`${API_URL}/Team/createTeam`,requestBody)
        return response
    } catch (error) {
        throw error
    }
}

export const getTeam = async()=>{
    const loggedInUser = JSON.parse( localStorage.getItem("user") )
        const requestBody = {
            userId: loggedInUser.id
        }
        const response = await axios.get(`${API_URL}/Team/getTeam`,{
            params: requestBody
        })
        return response
   
}
import axios from "axios"
import { API_URL } from "../Constants"
export const addMember = async (userId, teamId, role) => {

    try {
        
        const requestBody = {
            teamId: teamId,
            userId: userId,
            role: role
        }
        const response = await axios.post(`${API_URL}/ManageTeam/addTeamMember`, requestBody)
        return response
    } catch (error) {
        throw error
    }
}
export const removeMember = async (userId) => {

    try {
        
        const requestBody = {
            
            userId: userId,
           
        }
        const response = await axios.post(`${API_URL}/ManageTeam/removeTeamMember`, requestBody)
        return response
    } catch (error) {
        throw error
    }
}
export const getMember = async (teamId) => {

    try {
       
        const response = await axios.get(`${API_URL}/ManageTeam/getMember/${teamId}`
        )
        return response
    } catch (error) {
        throw error
    }
}

import axios from "axios"
import { API_URL } from "../Constants"
export const addMember = async (teamId, role) => {

    try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"))
        const requestBody = {
            teamId: teamId,
            userId: loggedInUser.id,
            role: role
        }
        const response = await axios.post(`${API_URL}/ManageTeam/addTeamMember`, requestBody)
        return response
    } catch (error) {
        throw error
    }
}
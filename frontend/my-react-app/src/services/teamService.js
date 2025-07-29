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
export const findTeam = async(teamId)=>{
   const loggedInUser = JSON.parse( localStorage.getItem("user") )
    try {
        const requestBody = {
            userId: loggedInUser.id,
            teamId: teamId
        }
        const response = await axios.post(`${API_URL}/Team/findTeam`,requestBody)
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
export const removeTeam = async (teamId) => {
  try {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const requestBody = {
      teamId,
      createdBy: loggedInUser.id, // Send the user ID (the creator of the team)
    };

    const response = await axios.post(`${API_URL}/Team/removeTeam`, requestBody);
    return response;
  } catch (error) {
    throw error;
  }
};
import axios from "axios"
import { API_URL } from "../Constants"
export const getTask = async () => {

   const loggedInUser = JSON.parse( localStorage.getItem("user") )
        const requestBody = {
            userId: loggedInUser.id
        }
        const response = await axios.post(`${API_URL}/Task/getTask`,requestBody)
        return response

}
// export const getUncompletedTask = async () => {

//     try {
//         const loggedInUser = JSON.parse(localStorage.getItem("user"))
//         const userId = loggedInUser.id
//         const response = await axios.get(`${API_URL}/Task/getUncompletedTask/${userId}`)
//         return response
//     } catch (error) {
//         throw error
//     }

// }
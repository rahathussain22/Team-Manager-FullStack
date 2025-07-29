import axios from "axios";
import { API_URL } from "../Constants";
export const getUsers = async()=>{
    try {
    const response= await axios.get(`${API_URL}/User/getUsers`)
    return response 
    } catch (error) {
        console.log("Error", error)
    }
   
    
}
import { API_URL } from "../Constants";
import axios from "axios";
export const login = async(email,password)=>{
    try {
        const requestBody = {
            email,
            password
        }
        const response = await axios.post(`${API_URL}/Auth/login`,requestBody)
        return response
    } catch (error) {
        throw error
    }
}
export const register = async(name,phone,email,password)=>{
    try {
        const requestBody = {
            name,
            phone,
            email,
            password
        }
        const response = await axios.post(`${API_URL}/Auth/register`,requestBody)
        return response
    } catch (error) {
        throw error
    }
}
export const logout = async () => {
  try {
    // Assuming you are using a token stored in localStorage, you may need to include it in the header
    const token = localStorage.getItem("user");

    const response = await axios.post(
      `${API_URL}/Auth/logout`,
      {},
      {
        // headers: {
        //   Authorization: `Bearer ${token}`, // Include token in the request header
        // },
      }
    );
    
    // Clear the user and token from localStorage
    localStorage.removeItem("user");


    return response;
  } catch (error) {
    throw error;
  }
};
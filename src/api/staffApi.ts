import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users";

// Function to fetch customers
export const fetchStaff = async () => {
  try {
    const response = await axios.get(`${API_URL}/staffs`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Rethrow error to be handled in the component
  }
};
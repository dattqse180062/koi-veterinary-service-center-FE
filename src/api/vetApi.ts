// src/api/vetApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/users/veterinarians';

// Function to fetch veterinarians
export const fetchVets = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching veterinarians:', error);
        throw error; // Rethrow error to be handled in the component
    }
};

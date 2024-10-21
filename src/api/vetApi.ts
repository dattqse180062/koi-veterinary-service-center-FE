// src/api/vetApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/users/veterinarians';
const API_BASE_URL = 'http://localhost:8080/api/v1/users';
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

// FOR: STAFF TO FETCH VETERINARIANS
// Function to fetch veterinarian based on Slot ID
// Slot id lấy = cách nào ???
export const fetchVetBySlotId = async (slotId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/veterinarian/${slotId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching veterinarian by slot ID:', error);
        throw error;
    }
};

// Function to get veterinarian profile information
export const getUserProfile = async (userId: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/profile`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Function to update veterinarian profile
export const updateUserProfile = async (userId: number, updatedData: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/profile`, updatedData, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Function to update veterinarian address
export const updateUserAddress = async (userId: number, addressData: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/address`, addressData, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user address:', error);
        throw error;
    }
};
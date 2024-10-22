import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";


export const fetchVetSlots = async (vetId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/slots/${vetId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching vet slots:", error);
        throw error;
    }
};

export const fetchVetSlotsAvailable = async (vetId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/slots/${vetId}/available`);
        return response.data;
    } catch (error) {
        console.error("Error fetching vet slots:", error);
        throw error;
    }
};
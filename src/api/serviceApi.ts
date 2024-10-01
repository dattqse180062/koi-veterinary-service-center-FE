// src/api/serviceApi.ts
import axios from 'axios';

const API_URL = 'https://66e10816c831c8811b538fae.mockapi.io/api/service';

export const fetchServices = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const updateServicePrice = async (serviceId: string, newPrice: number) => {
    try {
        await axios.put(`${API_URL}/${serviceId}`, {
            service_price: newPrice,
        });
    } catch (error) {
        console.error('Error updating price:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

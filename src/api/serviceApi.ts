// src/api/serviceApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/services';

export const fetchServices = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const updateServicePrice = async (serviceId: number, newPrice: number) => {
    try {
        console.log('Updating service with ID:', serviceId, 'and new price:', newPrice);
        await axios.put(`${API_URL}/${serviceId}`, {
            service_price: newPrice,
        });
    } catch (error) {
        console.error('Error updating price:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

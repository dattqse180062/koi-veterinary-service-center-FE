// src/api/transportApi.ts
import axios from 'axios';

const TRANSPORT_API_URL = 'https://66fa1da4afc569e13a9a726b.mockapi.io/api/transport';

export const fetchTransportationPrices = async () => {
    try {
        const response = await axios.get(TRANSPORT_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching transportation prices:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const updateTransportationPrice = async (district_name: number, newPrice: number) => {
    try {
        await axios.put(`${TRANSPORT_API_URL}/${district_name}`, {
            price: newPrice,
        });
    } catch (error) {
        console.error('Error updating transportation price:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

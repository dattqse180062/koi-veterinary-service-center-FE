// src/api/serviceApi.ts

import axios from 'axios';

const API_URL = 'https://66e10816c831c8811b538fae.mockapi.io/api/service';

export const fetchServices = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateServicePrice = async (serviceId: string, newPrice: number) => {
    await axios.put(`${API_URL}/${serviceId}`, {
        service_price: newPrice,
    });
};

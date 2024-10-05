// api/koiApi.ts
import axios from 'axios';

const BASE_URL = 'https://66fa1da4afc569e13a9a726b.mockapi.io/api/koi';

export const getKoiById = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const updateKoi = async (id: number, koiData: any) => {
    const response = await axios.put(`${BASE_URL}/${id}`, koiData);
    return response.data;
};

export const deleteKoi = async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
};

// api/koiApi.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/fishes';

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

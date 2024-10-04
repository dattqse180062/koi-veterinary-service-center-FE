import axios from 'axios';

const API_URL = 'https://66f4e0b477b5e889709aba92.mockapi.io/api/Appointment';

export const fetchAppointment = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createAppointment = async (appointment: any) => {
    const response = await axios.post(API_URL, appointment);
    return response.data;
};
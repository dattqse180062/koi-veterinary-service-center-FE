import axios from 'axios';

interface Appointment {
    service_id: number,
    address_id?: number | null,
    slot_id: number,
    veterinarian_id?: number | null,
    email: string,
    phone: string,
    customer_name: string,
    description?: string,
    fish_id?: number | null,
    payment: {
        payment_method: string,
    };
}

const createAppointment = async (payload: Appointment) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/appointments', payload);
        return response.data; // trả về dữ liệu từ API
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error; // ném lỗi để xử lý ở nơi gọi
    }
};

export const fetchAppointment = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/appointments`);
        return response.data; // trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error; // ném lỗi để xử lý ở nơi gọi
    }
}

export const fetchAppointmentForCus = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/appointments/customer`);
        return response.data; // trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error; // ném lỗi để xử lý ở nơi gọi
    }
}

export const getAppointmentDetails = async (appointment_id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/appointments/${appointment_id}`);
        return response.data; // trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        throw error; // ném lỗi để xử lý ở nơi gọi
    }
}



export { createAppointment };

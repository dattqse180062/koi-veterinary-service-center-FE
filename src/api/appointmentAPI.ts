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

export { createAppointment };

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

export const fetchAppointmentForCus = async (appointment_id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/appointments/${appointment_id}/customer`);
        return response.data; // trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error; // ném lỗi để xử lý ở nơi gọi
    }
}

// Function to fetch appointment details and slot id to get veterinarian name
export const getAppointmentDetails = async (appointment_id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/appointments/${appointment_id}`);
        return response.data; // trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        throw error; // ném lỗi để xử lý ở nơi gọi
    }
}


// Gọi hàm lấy chi tiết cuộc hẹn và danh sách bác sĩ

export const fetchAppointmentAndVeterinarians = async (appointment_id: number) => {
    try {
        const appointmentDetails = await getAppointmentDetails(appointment_id); // Gọi API để lấy chi tiết cuộc hẹn
        let veterinarians = [];
        
        if (appointmentDetails.slot_id) {
            // Nếu có slot_id, gọi API lấy danh sách bác sĩ
            const response = await axios.get(`http://localhost:8080/api/v1/users/veterinarian/${appointmentDetails.slot_id}`);
            veterinarians = response.data; // Lưu dữ liệu vào biến veterinarians
            console.log('Danh sách bác sĩ từ slot id đó:', veterinarians);
        } else {
            console.error('Không tìm thấy slot_id trong chi tiết cuộc hẹn');
        }

        return { appointmentDetails, veterinarians }; // Trả về cả chi tiết cuộc hẹn và danh sách bác sĩ
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết cuộc hẹn hoặc danh sách bác sĩ:', error);
        throw error; // Ném lại lỗi để có thể xử lý trong useEffect
    }
}


export const updateAppointment = async (appointment_id: number, veterinarian_id: number) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/appointments/${appointment_id}/veterinarian/${veterinarian_id}`);
        return response.data; // trả về dữ liệu từ API
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error; // ném lỗi để xử lý ở nơi gọi
    }
}


export { createAppointment };

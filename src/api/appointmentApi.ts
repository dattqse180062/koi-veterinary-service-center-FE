import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/appointments';

// Define interfaces for the data types used in the requests/responses
export interface AppointmentDetails {
    appointment_id: number;
    created_date: string;
    current_status: string;
    customer_name: string;
    email: string;
    phone_number: string;
    description: string;
    total_price: number;
    service: {
        service_id: number;
        service_name: string;
        service_price: number;
    };
    moving_surcharge: {
        moving_surcharge_id: number;
        district: string;
        price: number;
    };
    address: {
        address_id: number;
        city: string;
        district: string;
        ward: string;
        home_number: string;
        status: boolean;
    };
    veterinarian: {
        user_id: number;
        first_name: string;
        last_name: string;
    };
    fish: {
        fish_id: number;
        gender: string;
        age: number;
        species: string;
        size: number;
        weight: number;
        color: string;
        origin: string;
        enable: boolean;
    };
}

export interface StatusUpdate {
    current_status: string; // Ensure this matches the expected API structure
}

export interface MedicalReport {

    veterinarian_id: number;
    prescription_id: number;
    conclusion: string;
    advise: string;

}

export interface Medicine {
    medicine_id: number;
    medicine_name: string;
    quantity: number;
}

export interface Prescription {
    prescription_id: number;
    instruction: string;
    medicines: Medicine[];
}


// API to fetch appointment details by ID
export const getAppointmentDetails = async (appointmentId: number): Promise<AppointmentDetails> => {
    const response = await axios.get(`${API_BASE_URL}/${appointmentId}/veterinarian`);
    return response.data;
};

// API to update the status of an appointment
export const updateAppointmentStatus = async (appointmentId: number, statusUpdate: StatusUpdate) => {
    const response = await axios.post(`${API_BASE_URL}/${appointmentId}/status`, statusUpdate);
    return response.data;
};

// API to create a medical report for an appointment
export const createMedicalReport = async (appointmentId: number, report: MedicalReport) => {
    const response = await axios.post(`${API_BASE_URL}/${appointmentId}/report`, report);
    return response.data;
};

// API to fetch the medical report for an appointment
export const getMedicalReport = async (appointmentId: number): Promise<MedicalReport> => {
    const response = await axios.get(`${API_BASE_URL}/${appointmentId}/report`);
    return response.data;
};

// API to fetch appointment logs (status history)
export const getAppointmentLogs = async (appointmentId: number) => {
    const response = await axios.get(`${API_BASE_URL}/${appointmentId}/logs`);
    return response.data;
};

// API to create a new appointment
export const createAppointment = async (appointmentData: any) => {
    const response = await axios.post(API_BASE_URL, appointmentData);
    return response.data;
};

// API to fetch all appointments
export const getAllAppointments = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

// API to fetch appointments for a specific customer
export const getAppointmentsForCustomer = async (customerId: number) => {
    const response = await axios.get(`${API_BASE_URL}/customer/${customerId}`);
    return response.data;
};

const API_PRESCRIPTION_URL = 'http://localhost:8080/api/v1/prescriptions';

export const getMedicines = async () => {
    const response = await axios.get(`${API_PRESCRIPTION_URL}/medicines`);
    return response.data;
};

export const createPrescription = async (prescriptionData: any) => {
    const response = await axios.post(`${API_PRESCRIPTION_URL}`, prescriptionData);
    return response.data;
};

export const fetchPrescriptionDetails = async (prescriptionId: number): Promise<Prescription> => {
    try {
        const response = await axios.get(`${API_PRESCRIPTION_URL}/${prescriptionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching prescription by ID:', error);
        throw error;
    }
}

export const updateDoneStatus = async (appointmentId: number,status: string ) => {
    const response = await axios.put(`${API_BASE_URL}/${appointmentId}/status`, {
        status
    });
    return response.data;
};



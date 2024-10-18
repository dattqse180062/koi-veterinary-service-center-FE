import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/appointments";
const API_BASE_URL = "http://localhost:8080/api/v1/appointments";

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

// Function to get appointment details information
export const getAppointmentDetails = async (appointment_id: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${appointment_id}`, {
      params: { appointment_id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    throw error;
  }
};

// Function to get appointment reports
export const getAppointmentReports = async (appointment_id: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment reports:", error);
    throw error;
  }
};

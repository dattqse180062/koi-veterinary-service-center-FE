import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users";

// Function to fetch staff from the API
export const fetchStaff = async () => {
    try {
        const response = await axios.get(`${API_URL}/staffs`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error; // Rethrow error to be handled in the component
    }
};

//Fucntipn to add staff
 export const createStaff = async (staffData: any) => {
    try {
      const response = await fetch('http://localhost:8080/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });
  
      const message = await response.text();
  
      if (response.ok) {
        console.log('Staff creation successful:', message);
      } else {
        console.error('Failed to create staff:', message);
      }
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };


// Function to update staff profile information
export const updateStaffProfile = async (
    userId: number,
    updatedData: any
): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/profile`, updatedData, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating staff profile:", error);
        throw error;
    }
};

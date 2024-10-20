import axios from 'axios';

// URL cơ bản cho các API liên quan đến địa chỉ
const BASE_URL = 'http://localhost:8080/api/v1/addresses';
const DISTRICT_URL = 'http://localhost:8080/api/v1';
// API để lấy tất cả địa chỉ của khách hàng

export const fetchAddresses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error);
        throw error;
    }
};

// API để lấy chi tiết địa chỉ theo ID
export const fetchAddressById = async (addressId: number, customerId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${addressId}/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching address details:', error);
        throw error;
    }
};

// API để cập nhật địa chỉ theo ID
export const updateAddressById = async (addressId: number, customerId: number, addressData: any) => {
    try {
        const response = await axios.put(`${BASE_URL}/${addressId}/customer/${customerId}`, addressData);
        return response.data;
    } catch (error) {
        console.error('Error updating address:', error);
        throw error;
    }
};

// API để thêm địa chỉ mới cho khách hàng
export const addAddress = async (customerId: number, addressData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/customer/${customerId}`, addressData);
        return response.data;
    } catch (error) {
        console.error('Error adding new address:', error);
        throw error;
    }
};

// API để xóa địa chỉ theo ID
export const deleteAddress = async (customerId: number, addressId: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/customer/${customerId}`, {
            params: { addressId }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting address:', error);
        throw error;
    }
};

export const fetchDistricts = async () => {
    const response = await axios.get(`${DISTRICT_URL}/surcharges`);
    return response.data;
};

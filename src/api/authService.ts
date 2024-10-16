import axios from 'axios';

const API_URL = 'https://66e10816c831c8811b538fae.mockapi.io/api';
const BASE_URL = 'http://localhost:8080/api/v1/users';
export const register = async (username: string, email: string, password: string) => {
    try {
        // Gửi yêu cầu tới /login để tạo tài khoản mới
        const response = await axios.post(`${API_URL}/login`, { username, email, password });
        return response.data; // Trả về dữ liệu phản hồi nếu thành công
    } catch (error) {
        throw new Error('Error registering user'); // Ném lỗi nếu có lỗi
    }
};


// API để lấy thông tin người dùng
export const getUserInfo = async (userId: number) => {
    const response = await axios.get(`${BASE_URL}/profile?userId=${userId}`);
    return response.data;
};

// Update user profile
export const updateUserInfoAPI = async (userId: number, userData: any) => {
    const response = await axios.put(`${BASE_URL}/profile?userId=${userId}`, userData);
    return response.data;
};

// Update user address
export const updateUserAddressAPI = async (userId: number, addressData: any) => {
    const response = await axios.put(`${BASE_URL}/address?userId=${userId}`, addressData);
    return response.data;
};
export const changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
    const user = await getUserInfo(userId);

    if (user && user.password === currentPassword) {
        await updateUserInfoAPI(userId, { ...user, password: newPassword });
        return true; // Trả về true nếu thay đổi mật khẩu thành công
    } else {
        throw new Error('Current password is incorrect.');
    }
};

export const login = async (username: string, password: string) => {
    const response = await axios.get(`${API_URL}/login`);
    const users = response.data;
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
        sessionStorage.setItem('token', user.token); // Lưu token (hoặc id) vào sessionStorage
        sessionStorage.setItem('role', user.role); // Lưu role vào sessionStorage

        sessionStorage.setItem('userId', user.id);

        return user; // Trả về thông tin người dùng nếu đăng nhập thành công
    } else {
        throw new Error('Invalid credentials');
    }
};


import axios from 'axios';

const API_URL = 'https://66f4e0b477b5e889709aba92.mockapi.io/api';

export const register = async (username: string, email: string, password: string) => {
    try {
        // Gửi yêu cầu tới /login để tạo tài khoản mới
        const response = await axios.post(`${API_URL}/login`, { username, email, password });
        return response.data; // Trả về dữ liệu phản hồi nếu thành công
    } catch (error) {
        throw new Error('Error registering user'); // Ném lỗi nếu có lỗi
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
// API để lấy thông tin người dùng
export const getUserInfo = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/login/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw new Error('Error fetching user info');
    }
};

export const updateUserInfoAPI = async (userId: string, updatedData: any) => {
    const response = await axios.put(`${API_URL}/login/${userId}`, updatedData);
    return response.data;
};

// Thay đổi mật khẩu
export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
    const user = await getUserInfo(userId);

    if (user && user.password === currentPassword) {
        await updateUserInfoAPI(userId, { ...user, password: newPassword });
        return true; // Trả về true nếu thay đổi mật khẩu thành công
    } else {
        throw new Error('Current password is incorrect.');
    }
};



import axios from 'axios';

const API_URL = 'https://66e10816c831c8811b538fae.mockapi.io/api';

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
    console.log("Response from API:", response.data); // Kiểm tra dữ liệu trả về từ API

    const users = response.data;
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
        console.log("Matched User:", user); // Kiểm tra người dùng tìm được
        return user; // Trả về thông tin người dùng nếu đăng nhập thành công
    } else {
        throw new Error('Invalid credentials');
    }
};




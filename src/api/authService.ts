import axios from 'axios';

// const API_URL = 'https://66e10816c831c8811b538fae.mockapi.io/api';
const BASE_URL = 'http://localhost:8080/api/v1/users';
export const register = async (username: string, email: string, password: string, first_name: string, last_name: string) => {
    try {

        const response = await axios.post(`${BASE_URL}/signup`, {
            "username": username,
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name,
        }, {
            headers: {
                'Content-Type': 'application/json', // Ensure content type is set
            },
        });

        return response.data; // Return the response data
    } catch (error) {
        // Handle error (could be from API or network issues)
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data); // Custom error message from API
        } else {
            throw new Error('An error occurred during registration.'); // General error message
        }
    }
};




// export const login = async (username: string, password: string) => {
//     const response = await axios.get(`${API_URL}/login`);
//     const users = response.data;
//     const user = users.find((u: any) => u.username === username && u.password === password);
//
//     if (user) {
//         sessionStorage.setItem('token', user.token); // Lưu token (hoặc id) vào sessionStorage
//         sessionStorage.setItem('role', user.role); // Lưu role vào sessionStorage
//
//         sessionStorage.setItem('userId', user.id);
//
//         return user; // Trả về thông tin người dùng nếu đăng nhập thành công
//     } else {
//         throw new Error('Invalid credentials');
//     }
// };

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


export const logout = async (token: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/logout`, { token });
        return response.data; // Trả về phản hồi nếu cần thiết
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data); // Lỗi từ API
        } else {
            throw new Error('An error occurred during logout.');
        }
    }
};

export const refreshToken = async (token: string) => {
    const response = await axios.post(`${BASE_URL}/refresh`, { refreshToken: token });
    return response.data.result.token; // Adjust based on your actual API response structure
};



export const updateUserAvatarAPI = async (userId: number, image: File) => {
    const formData = new FormData();
    formData.append("user_id", userId.toString());
    formData.append("image", image);

    const response = await axios.put('http://localhost:8080/api/v1/users/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
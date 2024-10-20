// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface User {
    roleId: string;
    userId: number;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading để quản lý quá trình xác thực

    // Lấy JWT từ localStorage và kiểm tra khi khởi động app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                setIsAuthenticated(true);
                setUser({ userId: decodedToken.userId, roleId: decodedToken.scope });
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
        setLoading(false); // Khi quá trình kiểm tra token hoàn tất
    }, []);

    // Đăng nhập: lưu token vào localStorage và cập nhật trạng thái người dùng
    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decodedToken: any = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        setIsAuthenticated(true);

        setUser({ roleId: decodedToken.scope, userId: decodedToken.userId });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    };

    // Đăng xuất: xóa token khỏi localStorage và reset trạng thái người dùng
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (

        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

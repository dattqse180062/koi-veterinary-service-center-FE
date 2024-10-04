import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (userId: string) => void;
    logout: () => void;
    userId?: string; // Optionally store userId if needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
<<<<<<< HEAD
        const storedUserId = sessionStorage.getItem('userId');
        if (token && storedUserId) {
            setIsLoggedIn(true);
            setUserId(storedUserId);
=======
        if (token) {
            setIsLoggedIn(true);
            setUserId(token);
>>>>>>> dev
        }
    }, []);

    const login = (userId: string) => {
        setIsLoggedIn(true);
        setUserId(userId);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
<<<<<<< HEAD
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
        setIsLoggedIn(false);
        setUserId(undefined);
        sessionStorage.clear();
=======
        sessionStorage.removeItem('role');
        setIsLoggedIn(false);
        setUserId(undefined);
>>>>>>> dev
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

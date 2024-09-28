import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/context/AuthContext';

const AuthGuard: React.FC = () => {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            alert('Bạn chưa đăng nhập!!!!'); // Alert message
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;

//AuthGuard: Redirects users to the login page if they are not logged in and shows an alert.
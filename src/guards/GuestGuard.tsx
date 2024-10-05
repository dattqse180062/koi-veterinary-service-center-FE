import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/context/AuthContext';

const GuestGuard = () => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" replace />; // Redirect to home if logged in
    }
    return <Outlet />;
};

export default GuestGuard;
//GuestGuard: Redirects logged-in users to the home page if they try to access the login page.
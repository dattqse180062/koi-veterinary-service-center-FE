import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/context/AuthContext';

const RoleBasedGuard: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
    const { isLoggedIn } = useAuth();
    const role = sessionStorage.getItem('role');

    useEffect(() => {
        if (!isLoggedIn || (allowedRoles.length && !allowedRoles.includes(role!))) {
            alert('Bạn không có quyền truy cập trang này!'); // Alert message
        }
    }, [isLoggedIn, allowedRoles, role]);

    if (!isLoggedIn || (allowedRoles.length && !allowedRoles.includes(role!))) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};



export default RoleBasedGuard;
//RoleBasedGuard: Redirects users without the required roles to the home page and shows an alert if they try to access restricted areas.
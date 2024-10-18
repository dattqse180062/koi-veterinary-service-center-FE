import React, { useContext } from 'react';

import { AuthProvider } from '../hooks/context/AuthContext';
import { useAuth } from '../hooks/context/AuthContext';
import StaffAppointment from './StaffAppointment';
import CustomerAppointment from './CustomerAppointment';

interface User {
    roleId: string;
    userId: number;
}

const MyAppointment = () => {
    const { user } = useAuth();

    if (user?.roleId === 'STA') {
        return <StaffAppointment />;
    } else if (user?.roleId === 'CUS') {
        return <CustomerAppointment />;
    } else {
        return <div>Bạn không có quyền truy cập trang này.</div>;
    }
};

export default MyAppointment;

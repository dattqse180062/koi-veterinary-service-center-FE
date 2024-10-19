import { useAuth } from '../hooks/context/AuthContext';
import StaffAppointment from './StaffAppointment';
import CustomerAppointment from './CustomerAppointment';

interface User {
    roleId: string;
    userId: number;
}

const DispatchAppointment = () => {
    const { user } = useAuth();

    if (user?.roleId === 'STA') {
        return <StaffAppointment />;

    } else if (user?.roleId === 'CUS') {
        return <CustomerAppointment />;
        
    } else {
        return <div>Bạn không có quyền truy cập trang này.</div>;
    }
};

export default DispatchAppointment;


// import { useContext } from 'react';
// import  AuthContext  from "../hooks/context/AuthContext";
// import CustomerAppointment from "./CustomerAppointment";
// import StaffAppointment from "./StaffAppointment";
// import UnauthorizedPage from "./UnauthorizedPage";

// interface User {
//     roleId: string;
//     userId: number;
// }

// const MyAppointmentPage = () => {
//     const { user } = useContext(AuthContext);

//     // Check the user's role and render the corresponding appointment page
//     if (user?.role === 'CUS') {
//         return <CustomerAppointment />;
//     } else if (user?.role === 'STA') {
//         return <StaffAppointment />;
//     } else {
//         return <UnauthorizedPage />;
//     }
// };

// export default MyAppointmentPage;

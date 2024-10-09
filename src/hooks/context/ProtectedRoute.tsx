// src/components/PrivateRoute.tsx
import React from 'react';
import { Route, redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    component: React.FC;
    [key: string]: any; // Để hỗ trợ props khác
}

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
//     // const { token } = useAuth();
//     //
//     // return (
//     //     <Route
//     //         {...rest}
//     //         render={(props) =>
//     //             token ? (
//     //                 <Component {...props} />
//     //             ) : (
//     //                 <Redirect to="/dangnhap" />
//     //             )
//     //         }
//     //     />
//     // );
// };

// export default PrivateRoute;

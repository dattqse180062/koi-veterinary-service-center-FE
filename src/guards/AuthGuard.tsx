// AuthGuard.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/context/AuthContext';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, loading } = useAuth();

    // Nếu vẫn đang load xác thực từ localStorage, có thể hiển thị loading indicator
    if (loading) {
        return <div>Loading...</div>;
    }

    // Nếu chưa đăng nhập, điều hướng về trang login
    if (!isAuthenticated) {
        alert("You did not login!!! please login.")
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;

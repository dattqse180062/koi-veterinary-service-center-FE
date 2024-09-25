import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecretPage = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            alert('Bạn chưa đăng nhập!'); // Hiển thị alert
            setLoading(false);
            navigate('/login'); // Chuyển hướng sau khi người dùng đã thấy alert
            return;
        }

        // Kiểm tra role chỉ sau khi xác thực token
        if (role !== 'admin') {
            alert('Bạn không có quyền truy cập trang này!'); // Hiển thị alert
            setLoading(false);
            navigate('/'); // Chuyển hướng sau khi người dùng đã thấy alert
            return;
        }

        // Nếu đến đây có nghĩa là người dùng là admin
        setLoading(false);
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{backgroundColor:"lightblue"}}>
            <h2 className="mt-5">Admin Page</h2>
            <p className="mt-3">Bạn đang ở secret page và chỉ có admin mới có quyền truy cập được trang này.</p>
        </div>
    );
};

export default SecretPage;

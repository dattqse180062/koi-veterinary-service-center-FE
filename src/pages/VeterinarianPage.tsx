import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from "../components/layout/LeftSideBarForVeterinarian";
import FeedbackAndRatingTable from '../components/Veterinarianpage/FeedbackAndDetails/FeedbackAndRatingTable';

const VeterinarianPage = () => {
    const [loading, setLoading] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(false); // Trạng thái mở/đóng sub-menu Price Management

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState<string>('feedback');

    const handleMenuClick = (menu: string): void => {
        // setActiveMenu(menu);
        if (menu === 'price') {
            setIsPriceOpen(prev => !prev); // Đảo ngược trạng thái mở/đóng của Price Management
            setActiveMenu(menu); // Cập nhật activeMenu
        } else {
            setIsPriceOpen(false); // Đóng sub-menu nếu click vào menu khác
            setActiveMenu(menu); // Cập nhật activeMenu
        }
    };

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
        if (role !== 'veterinarian') {
            alert('Bạn không có quyền truy cập trang này!'); // Hiển thị alert
            setLoading(false);
            navigate('/'); // Chuyển hướng sau khi người dùng đã thấy alert
            return;
        }

        // Nếu đến đây có nghĩa là người dùng là veterinarian - bác sĩ thú y
        setLoading(false);
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="d-flex" style={{ backgroundColor: 'lightblue', minHeight: '100vh' }}>
            <div style={{ width: '250px' }}> {/* Đặt chiều rộng cho SideMenu */}
                <SideMenu activeMenu={activeMenu} onMenuClick={handleMenuClick} />
            </div>
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                {activeMenu === 'shift' && (
                    <>
                        <h1>In process - iter 2 </h1>
                    </>
                )}
                {activeMenu === 'history' && (
                    <>
                        {/* <AppointmentHistoryTable /> */}
                        <h1>In process - iter 2 </h1>

                    </>
                )}
                {activeMenu === 'customer' && (
                    <>
                        {/* <CustomerTable /> */}
                        <h1>In process - iter 2 </h1>

                    </>
                )}
                {activeMenu === 'feedback' && (
                    <>
                        <FeedbackAndRatingTable />
                    </>
                )}
                {activeMenu === 'reports' && (
                    <>
                        <h1>In process - iter 2 </h1>

                    </>
                )}
                {activeMenu === 'price' && (
                    <>
                        <h1>In process - iter 2 </h1>

                    </>
                )}

            </div>
        </div>
    );
};

export default VeterinarianPage;

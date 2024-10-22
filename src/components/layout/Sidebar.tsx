import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { useAuth } from "../../hooks/context/AuthContext"; // Import CSS nếu cần

const Sidebar: React.FC = () => {
    const { user } = useAuth();  // Lấy thông tin user từ context
    const role = user?.roleId;   // Lấy role của người dùng
    const [isPricingOpen, setIsPricingOpen] = useState(false); // State để mở rộng submenu Pricing
    const location = useLocation();
    const togglePricingMenu = () => {
        setIsPricingOpen((prev) => !prev);
    };
    const isActive = (path: string) => location.pathname === path ? 'text-primary' : 'text-secondary';
    return (
        <div className="d-flex flex-column sidebar border-right " style={{ width: '292px', height: '100vh' }}>
            <div className="p-3 " style={{marginTop:"60px"}}>
                {/* Hiển thị các mục theo role */}
                {role === 'MAN' && (
                    <>
                        <Link to="/manager/appointment-list" className={`nav-link ${isActive('/manager/appointment-list')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Appointment List</span>
                            </div>
                        </Link>
                        <Link to="/manager/customer" className={`nav-link ${isActive('/manager/customer')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Customer</span>
                            </div>
                        </Link>



                        <Link to="/manager/vet-list" className={`nav-link ${isActive('/manager/vet-list')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Veterinarians</span>
                            </div>
                        </Link>

                        <Link to="/manager/staff-list" className={`nav-link ${isActive('/manager/staff-list')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Staff</span>
                            </div>
                        </Link>

                        <Link to="/manager/feedback" className={`nav-link ${isActive('/manager/feedback')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Feedback</span>
                            </div>
                        </Link>

                        {/* Pricing submenu */}
                        <div className="nav-link text-secondary" onClick={togglePricingMenu} style={{ cursor: 'pointer' }}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Pricing</span>
                                <i className={`fa ${isPricingOpen ? 'fa-caret-down' : 'fa-caret-right'} ms-auto`}></i> {/* Toggle icon */}
                            </div>
                        </div>
                        {isPricingOpen && (
                            <div className="ms-3"> {/* Submenu items */}
                                <Link to="/manager/service-pricing" className={`nav-link ${isActive('/manager/service-pricing')}`}>
                                    <div className="d-flex align-items-center">
                                        <span className="fw-bold ms-2">Service Pricing</span>
                                    </div>
                                </Link>
                                <Link to="/manager/transport-pricing" className={`nav-link ${isActive('/manager/transport-pricing')}`}>
                                    <div className="d-flex align-items-center">
                                        <span className="fw-bold ms-2">Transport Pricing</span>
                                    </div>
                                </Link>
                            </div>
                        )}


                    </>
                )}

                {/* Customer Role */}
                {role === 'CUS' && (
                    <>

                        <Link to="/my-appointment" className={`nav-link ${isActive('/my-appointment')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">My Appointment</span>
                            </div>
                        </Link>

                        <Link to="/koi/my-koi" className={`nav-link ${isActive('/koi/my-koi')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">My Koi</span>
                            </div>
                        </Link>

                        <Link to="/address/my-address" className={`nav-link ${isActive('/address/my-address')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">My Address</span>
                            </div>
                        </Link>
                    </>
                )}

                {/* Veterinarian Role */}
                {role === 'VET' && (
                    <>

                        <Link to="/veterinarian/schedule" className={`nav-link ${isActive('/veterinarian/schedule')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Schedule</span>
                            </div>
                        </Link>
                    </>
                )}

                {/* Staff Role */}
                {role === 'STA' && (
                    <>
                        <Link to="/staff/appointment-list" className={`nav-link ${isActive('/staff/appointment-list')}`}>
                            <div className="d-flex align-items-center">
                                <div className="icon-placeholder"></div>
                                <span className="fw-bold ms-2">Appointment List</span>
                            </div>
                        </Link>
                    </>
                )}

                {/* Profile - available for all roles */}
                <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Settings</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;


import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RoleBasedGuard from '../../guards/RoleBasedGuard';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css'; // Import your CSS for additional styling if needed

const Sidebar: React.FC = () => {

    const [isPricingOpen, setIsPricingOpen] = useState(false); // State to handle Pricing submenu

    const togglePricingMenu = () => {
        setIsPricingOpen((prev) => !prev);
    };

    return (
        <div className="d-flex flex-column bg-white border-right" style={{ width: '292px', height: '100vh' }}>
            <div className="p-3 mt-5">
                <Link to="/" className="nav-link text-primary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Home</span>
                    </div>
                </Link>

                {/* Manager Menu */}
                <Link to="/customer" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Customer</span>
                    </div>
                </Link>

                <Link to="/feedback" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Feedback</span>
                    </div>
                </Link>

                
                <Link to="/vetshift" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Veterinarians</span>
                    </div>
                </Link>

                {/* View Staff */}
                <Link to="/staff" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Staff</span>
                    </div>
                </Link>

                {/* Pricing Menu */}
                <div className="nav-link text-secondary" onClick={togglePricingMenu} style={{ cursor: 'pointer' }}>
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Pricing</span>
                        <i className={`fa ${isPricingOpen ? 'fa-caret-down' : 'fa-caret-right'} ms-auto`}></i> {/* Toggle icon */}
                    </div>
                </div>
                {isPricingOpen && (
                    <div className="ms-3"> {/* Indent sub-items */}
                        <Link to="/service-pricing" className="nav-link text-secondary">
                            <div className="d-flex align-items-center">
                                <span className="fw-bold ms-2">Service Pricing</span>
                            </div>
                        </Link>
                        <Link to="/transport-pricing" className="nav-link text-secondary">
                            <div className="d-flex align-items-center">
                                <span className="fw-bold ms-2">Transport Pricing</span>
                            </div>
                        </Link>
                    </div>
                )}

                <Link to="/appointment" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Appointment List</span>
                    </div>
                </Link>

                <Link to="/messages" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Messages</span>
                        <div className="badge bg-danger ms-auto">24</div>
                    </div>
                </Link>

                <Link to="/settings" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Settings</span>
                    </div>
                </Link>

                <Link to="/koi" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div>
                        <span className="fw-bold ms-2">Koi List</span>
                    </div>
                </Link>


            </div>
        </div>
    );
};
export default Sidebar;
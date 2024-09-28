import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css'; // Import your CSS for additional styling if needed

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex flex-column bg-white border-right" style={{ width: '292px', height: '100vh' }}>
            <div className="p-3">
                <Link to="/" className="nav-link text-primary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div> {/* Placeholder for icons */}
                        <span className="fw-bold ms-2">Home</span>
                    </div>
                </Link>
                <Link to="/vetshift" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div> {/* Placeholder for icons */}
                        <span className="fw-bold ms-2">Veterinarians</span>
                    </div>
                </Link>
                <Link to="/history" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div> {/* Placeholder for icons */}
                        <span className="fw-bold ms-2">History</span>
                    </div>
                </Link>
                <Link to="/messages" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div> {/* Placeholder for icons */}
                        <span className="fw-bold ms-2">Messages</span>
                        <div className="badge bg-danger ms-auto">24</div> {/* Notification badge */}
                    </div>
                </Link>
                <Link to="/settings" className="nav-link text-secondary">
                    <div className="d-flex align-items-center">
                        <div className="icon-placeholder"></div> {/* Placeholder for icons */}
                        <span className="fw-bold ms-2">Settings</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;

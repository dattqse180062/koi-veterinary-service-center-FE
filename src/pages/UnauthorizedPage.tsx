// src/pages/UnauthorizedPage.tsx

import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        window.history.back(); // Quay lại trang trước đó
    };
    return (
        <div className="container text-center" style={{marginTop: '100px'}}>
            <h1 className="display-4">403 Forbidden</h1>
            <p className="lead">You do not have permission to access this page.</p>
            <Link to="/" className="btn btn-primary">
                Go to Home
            </Link>
            <button className="btn btn-secondary" onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default UnauthorizedPage;
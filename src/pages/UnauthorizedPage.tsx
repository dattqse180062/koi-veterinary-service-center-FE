// src/pages/UnauthorizedPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
    return (
        <div className="container text-center" style={{ marginTop: '100px' }}>
            <h1 className="display-4">403 Forbidden</h1>
            <p className="lead">You do not have permission to access this page.</p>
            <Link to="/" className="btn btn-primary">
                Go to Home
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
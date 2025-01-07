import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, allowedRoles }) {
    const role = localStorage.getItem('role');
    
    if (!allowedRoles.includes(role)) {
        return React.createElement(Navigate, { to: "/admin/login", replace: true });
        // <Navigate to="/" replace />;
    }

    return children;

}
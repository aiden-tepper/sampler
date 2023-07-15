import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    console.log("protected route: authenticated=" + isAuthenticated);

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

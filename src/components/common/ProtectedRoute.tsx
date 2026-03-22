import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from './Loading';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loading message="Checking authentication..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

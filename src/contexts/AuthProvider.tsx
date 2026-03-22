import React, { useState, useEffect, type ReactNode } from 'react';
import { authAPI } from '../services';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on mount
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                const isValid = await authAPI.verify();
                setIsAuthenticated(isValid);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authAPI.login({ email, password });
        localStorage.setItem('access_token', response.access_token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

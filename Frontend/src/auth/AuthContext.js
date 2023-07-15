import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        sessionStorage.setItem('isAuthenticated', true);
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
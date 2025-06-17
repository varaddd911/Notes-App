import React, { createContext, useState, useContext, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored token on mount
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const response = await fetch(`${API_URL}/api/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                handleLogout();
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            handleLogout();
        }
        setLoading(false);
    };

    const login = async (googleToken) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: googleToken })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setUser(data.user);
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        // Clean up Google OAuth state
        googleLogout();
        // Remove token and user data
        localStorage.removeItem('token');
        setUser(null);
        // Add a small delay to allow Google OAuth cleanup
        setTimeout(() => {
            window.location.href = '/';
        }, 100);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout: handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

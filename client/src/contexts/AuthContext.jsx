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
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
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
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ token: googleToken })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            await fetchUser(data.token);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const handleLogout = () => {
        try {
            googleLogout();
        } catch (error) {
            console.error('Error during Google logout:', error);
        }
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout: handleLogout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
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

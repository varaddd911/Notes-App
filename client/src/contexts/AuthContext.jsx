import React, { createContext, useState, useContext, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for stored token on mount
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }

        // Cleanup function
        return () => {
            // Clean up any subscriptions or timeouts here
        };
    }, []);

    const fetchUser = async (token) => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('Failed to fetch user data. Please try logging in again.');
            handleLogout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (googleToken) => {
        try {
            setLoading(true);
            setError(null);

            console.log('Attempting login with API URL:', API_URL); // Debug log

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
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            await fetchUser(data.token);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Failed to login. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setLoading(true);
        try {
            googleLogout();
        } catch (error) {
            console.error('Error during Google logout:', error);
        }
        // Clear all auth-related data
        localStorage.clear(); // Clear all localStorage data
        setUser(null);
        setError(null);
        
        // Force a page reload to clear all state and redirect to login
        window.location.href = '/';
    };

    const value = {
        user,
        login,
        logout: handleLogout,
        loading,
        error
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

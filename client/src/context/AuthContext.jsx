import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken, loginUser, registerUser, logoutUser, getCurrentUser } from '../api';
import { handleError } from '../utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            try {
                const res = await authAPI.getCurrentUser();
                setUser(res.data);
            } catch (err) {
                handleError(err);
                setUser(null);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const handleAuthSuccess = (res) => {
        localStorage.setItem('token', res.data);
        loadUser();
    };


    const login = async (email, password) => {
        try {
            const res = await loginUser(email, password);
            handleAuthSuccess(res);
        } catch (err) {
            handleError(err);
        }
    };

    const register = async (formData) => {
        try {
            const res = await registerUser(formData);
            handleAuthSuccess(res);
        } catch (err) {
            handleError(err);
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem('token');
            setUser(null);
        } catch (err) {
            handleError(err);
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
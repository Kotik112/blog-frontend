// eslint-disable-next-line no-unused-vars
import { React, createContext, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

/**
 * @type {import('react').Context<{
 *   user: User|null,
 *   login: (userData: User) => void,
 *   logout: () => void,
 *   loading: boolean
 * }>}
 */

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    loading: true
});

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const login = useCallback((userData) => {
        setUser(userData);
    }, []);

    const logout = useCallback(async () => {
        await fetch(`https://${BASE_URL}/api/v1/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        setUser(null);
        navigate("/");
    }, [navigate, BASE_URL]);

    useEffect(() => {
        fetch(`https://${BASE_URL}/api/v1/auth/whoami`, {
            credentials: "include"
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => console.log(data))
            .then(data => {
                if (data && data.username && data.sessionId && Array.isArray(data.roles)) {
                    setUser(data.username);
                } else {
                    setUser(null);
                }
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, [BASE_URL]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({ user, login, logout, loading }), [user, login, logout, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
import {createContext, useState, useEffect, useMemo, useCallback} from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = useCallback((userData) => {
        setUser(userData);
    }, []);

    const logout = useCallback(async () => {
        await fetch("http://localhost:8080/api/v1/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        setUser(null);
        navigate("/");
    }, [navigate]);

    // Check session on app load
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/auth/whoami", {
            credentials: "include"
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setUser(data);
                } else {
                    setUser(null);
                }
            })
            .catch(() => setUser(null));
    }, []);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({ user, login, logout }), [user, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
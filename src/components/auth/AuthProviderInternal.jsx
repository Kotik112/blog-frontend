import {createContext, useCallback, useEffect, useMemo, useState, React} from "react";
import {BASE_URL} from "../../utils/config.js";
import {ROUTES} from "../../constants/Routes.js";
import PropTypes from "prop-types";

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    loading: true
});

export function AuthProviderInternal({ children, navigate }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const login = useCallback((userData) => {
        setUser(userData);
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch(`${BASE_URL}/api/v1/auth/logout`, {
                method: "POST",
                credentials: "include"
            });
        } catch (err) {
            console.error("Logout failed:", err);
        }
        setUser(null);
        navigate(ROUTES.HOME);
    }, [navigate]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/auth/whoami`, {
            credentials: "include"
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.username && data?.sessionId && Array.isArray(data?.roles)) {
                    setUser(data);
                } else {
                    setUser(null);
                }
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    const contextValue = useMemo(() => ({ user, login, logout, loading }), [user, login, logout, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProviderInternal.propTypes = {
    children: PropTypes.node.isRequired,
    navigate: PropTypes.func.isRequired
};
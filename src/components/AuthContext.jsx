import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Check session on app load
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/auth/me", {
            credentials: "include"
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => setUser(data))
            .catch(() => setUser(null));
    }, []);

    const login = (username) => setUser({ username });
    const logout = () => {
        fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: "include"
        }).finally(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
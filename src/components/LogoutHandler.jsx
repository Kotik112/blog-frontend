import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth.jsx";

export default function LogoutHandler() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/login");
    }, [logout, navigate]);

    return null; // no UI needed
}
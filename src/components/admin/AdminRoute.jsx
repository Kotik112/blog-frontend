import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import { ROUTES } from "../../constants/Routes.js";

export default function AdminRoute() {
    const { user, loading } = useAuth();
    if (loading) return null; // or a spinner
    const isAdmin = Array.isArray(user?.roles) && (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ADMIN"));
    return isAdmin ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
}
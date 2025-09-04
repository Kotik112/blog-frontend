import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import { ROUTES } from "../../constants/Routes.js";
import PropTypes from "prop-types";

export default function RequireAdmin({ children }) {
    const { user, loading } = useAuth();
    const loc = useLocation();

    if (loading) return null; // or a spinner

    const isAdmin = Array.isArray(user?.roles) &&
        (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ADMIN"));

    return isAdmin ? children : <Navigate to={ROUTES.HOME} replace state={{ from: loc }} />;
}

RequireAdmin.propTypes = {
    children: PropTypes.node.isRequired,
}
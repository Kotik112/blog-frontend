import { useAuth } from './useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";

export default function RequireAuth({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
};
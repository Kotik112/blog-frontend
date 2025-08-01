import { useAuth } from './useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import {ROUTES} from "../../constants/Routes.js";

export default function RequireAuth({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // TODO: Implement a spinner or loading indicator
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return children;
}

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
};
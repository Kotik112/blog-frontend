// eslint-disable-next-line no-unused-vars
import { React } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { AuthProviderInternal } from "./AuthProviderInternal.jsx";

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    return <AuthProviderInternal navigate={navigate}>{children}</AuthProviderInternal>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
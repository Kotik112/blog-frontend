import { useContext } from 'react';
import { AuthContext } from './AuthProvider.jsx';


/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} ipAddress
 * @property {string[]} roles
 * @property {string} sessionId
 */

export function useAuth() {
    return useContext(AuthContext);
}

/**
 * Check if current user has a specific role.
 * @param {string} role
 * @returns {boolean}
 */
export function useHasRole(role) {
    const { user } = useAuth();
    return user?.roles?.includes(role) ?? false;
}
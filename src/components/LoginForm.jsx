import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "./auth/useAuth.jsx";
import {ROUTES} from "../constants/Routes.js";
import {BASE_URL} from "../utils/config.js";

export default function LoginForm() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                })
            });

            if (response.status === 401) {
                setError("Invalid credentials.");
            } else if (response.ok) {
                const userData = await response.json();
                login(userData);
                navigate('/');
            } else {
                setError("Unexpected error occurred.");
            }
        } catch (err) {
            console.error(err);
            setError("Network or server error.");
        }
    };

    return (
        <div className="min-h-screen bg-[#DBE9EE] px-4">
            <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account? <Link to={ROUTES.REGISTER} className="text-blue-500 hover:text-blue-700">Register</Link>
                </p>
            </div>
        </div>
    );

}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./auth/useAuth.jsx";

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
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // ⬅️ store session cookie
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
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

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
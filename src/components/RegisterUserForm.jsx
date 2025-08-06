import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {ROUTES} from "../constants/Routes.js";
import {BASE_URL} from "../utils/config.js";

export default function RegisterUserForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: ''
    })
    const [status, setStatus] = useState(null);
    
    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            setStatus("Passwords do not match.");
            return;
        }

        setStatus("Submitting your post...");
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...safeFormData } = formData;

        try {
            const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(safeFormData)
            });

            if (response.ok) {
                setStatus("User registered successfully!");
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    firstName: '',
                    lastName: ''
                });
                setTimeout(() => {
                    navigate(ROUTES.LOGIN);
                }, 1500); // Redirect to login after 1.5 seconds
            } else {
                const errorText = await response.text();
                setStatus(`Failed: ${errorText}`);
            }
        } catch (e) {
            console.error("Error submitting post:", e);
            setStatus("Failed to submit post. Please try again later.");
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
            <p className="text-gray-600 text-center mb-6">
                Create a new user account by filling out the form below.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
                        />
                    </div>

                    <div className="flex-1 mt-4 md:mt-0">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username:
                    </label>
                    <p className="text-xs ">Must be unique and at least 3 characters</p>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <p className="text-xs ">Must be at least 6 characters</p>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>

                {status && <p className="mt-4 text-center text-sm text-gray-600">{status}</p>}
            </form>
        </div>
    )
}
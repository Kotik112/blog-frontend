import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from "../constants/Routes.js";
import {BASE_URL} from "../utils/config.js";

export default function BlogPostForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();


    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = new FormData();
        submitData.append("title", formData.title)
        submitData.append("content", formData.content)
        if(file) {
            submitData.append("image", file)
        }

        try {
            const response = await fetch(`${BASE_URL}/api/v1/blog`, {
                method: 'POST',
                credentials: 'include',
                body: submitData
            });

            if (response.status === 401 || response.status === 403) {
                navigate(ROUTES.LOGIN);
            } else if (response.ok) {
                setStatus("Blog post created successfully!");
                navigate(ROUTES.HOME); // Redirect to home page after successful submission
            } else {
                setStatus("Error posting blog!");
            }
        } catch (error) {
            setStatus("Failed to submit blog post. Please try again later.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4 text-center">Submit a Post</h1>
            <p className="text-gray-600 text-center mb-6">
                Fill out the form below to share your thoughts.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div>
                    <label htmlFor="file_input" className="block text-sm font-medium text-gray-700">
                        Upload File
                    </label>
                    <input
                        type="file"
                        id="file_input"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
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

    );
}
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function CommentForm() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("blogPostId");
    const postIdNumber = parseInt(postId);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        content: '',
        blogPostId: postIdNumber
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        try {
            const response = await fetch('http://localhost:8080/api/v1/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Handle success
                console.log('Comment created successfully!');
                setFormData({ content: '', blogPostId: postIdNumber });
                navigate("/your-posts"); // Redirect to your posts page after successful submission // TODO: Change this to the appropriate page
            } else {
                // Handle error
                console.error('Failed to create Comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Comment Form for post id: {postIdNumber}</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    message</label>
                <textarea id="comment" rows="5"
                          name="content"
                          onChange={handleInputChange}
                          required
                          placeholder="Leave a comment..."
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                          border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                          dark:focus:border-blue-500"
                />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
                dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
            </form>
        </div>
    );
}
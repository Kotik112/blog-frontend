import { useState } from 'react';

export default function BlogPostForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [file, setFile] = useState(null);

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
        for(let [key, value] of submitData.entries()) {
            console.log(key, value)
        }
        try {
            const response = await fetch('http://localhost:8080/api/v1/blog', {
                method: 'POST',
                body: submitData
            });

            if (response.ok) {
                // Handle success
                console.log('Blog post created successfully!');
            } else {
                // Handle error
                console.error('Failed to create blog post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-100 pt-10">
            <div className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="title"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                        dark:shadow-sm-light"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="content"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    ></textarea>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload
                    file</label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                    bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400"
                    onChange={handleFileChange}
                    id="file_input"
                    type="file"/>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
                dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
            </div>
        </form>
    );
}
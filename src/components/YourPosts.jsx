import { useEffect, useState } from 'react';
import BlogPost from './BlogPost.jsx';

export default function YourPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/blog/logged-in-user?page=0&size=5', {
                    method: 'GET',
                    credentials: 'include', // sends JSESSIONID
                });


                if (response.status === 401 || response.status === 403) {
                    setError("Unauthorized or failed to fetch.");
                } else if (!response.ok) {
                    setError("Failed to fetch.");
                }

                const data = await response.json();
                setPosts(data.content); // assuming you're using .content from Page
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };

        fetchUserPosts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
            {error && <p className="text-red-500">{error}</p>}
            {posts.length === 0 && !error && <p>No posts found.</p>}
            {posts.map(post => (
                <BlogPost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    comments={post.comments}
                    image={post.image}
                    createdBy={post.createdBy}
                />
            ))}
        </div>
    );
}


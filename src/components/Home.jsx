import { useState, useEffect } from 'react';

export default function Home() {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/blog')
            .then(response => response.json())
            .then(data => setBlogPosts(data))
            .catch(error => console.error('Error fetching blog posts:', error));
    }, []);

    return (
        <div className="flex flex-wrap">
            {blogPosts.map(post => (
                <div key={post.id} className="m-2 p-2 border">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <h3>Comments:</h3>
                    <div className="flex">
                        {post.comments.map(comment => (
                            <div key={comment.id} className="m-2 p-2 border">
                                <p>{comment.content}</p>
                                {/* Add other fields as needed */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}


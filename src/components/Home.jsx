import { useState, useEffect } from 'react';
import BlogPost from "./BlogPost.jsx";

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
                <BlogPost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    comments={post.comments}
                />
            ))}
        </div>
    );
}


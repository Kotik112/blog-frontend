// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import BlogPost from "./BlogPost.jsx";
import PageBar from "./PageBar.jsx";
import { useAuth } from "./auth/useAuth.jsx";

export default function Home() {
    const { user } = useAuth();
    const [blogPosts, setBlogPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const BASE_URL = import.meta.env.VITE_BACKEND_URL;
        fetch(`${BASE_URL}/api/v1/blog?page=${currentPage}`, {
            method: 'GET',
            credentials: 'include', // Include cookies for session management
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unauthorized or failed to fetch.");
                }
                return response.json();
            })
            .then(data => {
                setBlogPosts(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => setError(error.message));
    }, [currentPage]);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="flex flex-col " style={{marginBottom: "100px"}}>
            { user && (
                <p className="text-center mt-4 text-sm text-gray-600">
                    Logged in as <strong>{user.username}</strong> ({user.roles.join(", ")})
                </p>
            )}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}
            {blogPosts.map(post => (
                <BlogPost
                    key={post.id}
                    id={post.id}
                    image={post.image}
                    title={post.title}
                    content={post.content}
                    comments={post.comments}
                    createdBy={post.createdBy}
                />
            ))}
            <PageBar
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
            />
        </div>
    );
}
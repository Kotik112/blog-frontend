
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost.jsx';
import PageBar from "./PageBar.jsx";
import {BASE_URL} from "../utils/config.js";

export default function YourPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/blog/logged-in-user?page=${currentPage}&size=5`, {
            method: 'GET',
            credentials: 'include',
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
                setPosts(data.content);
                setTotalPages(data.totalPages);
            })
            .finally(() => setLoading(false))
            .catch(error => setError(error.message));
    }, [currentPage]);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <div className="bg-[#dbe9ee] p-4">
                <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && posts.length === 0 && !error && <p>No posts found.</p>}
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
            <PageBar
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
            />
        </div>
    );
}


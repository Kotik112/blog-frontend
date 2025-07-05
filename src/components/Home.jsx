import { useState, useEffect } from 'react';
import BlogPost from "./BlogPost.jsx";
import PageBar from "./PageBar.jsx";
import PropTypes from "prop-types";

export default function Home({auth}) {
    const [blogPosts, setBlogPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:8080/api/v1/blog?page=${currentPage}`, {
            headers: {
                "Authorization": "Basic " + auth
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
    }, [currentPage, auth]);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="flex flex-col " style={{marginBottom: "100px"}}>
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}
            {blogPosts.map(post => (
                <BlogPost

                    key={post.id}
                    id={post.id}
                    image={post.image}
                    title={post.title}
                    content={post.content}
                    comments={post.comments}
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

Home.propTypes = {
    auth: PropTypes.string.isRequired
};
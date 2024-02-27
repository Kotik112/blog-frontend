import { useState, useEffect } from 'react';
import BlogPost from "./BlogPost.jsx";
import PageBar from "./PageBar.jsx";

export default function Home() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/blog?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched totalPages:", data.totalPages, "for currentPage:", currentPage);
                setBlogPosts(data.content)
                setTotalPages(data.totalPages)
                //console.log("Current page = " + currentPage)
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    }, [currentPage]);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="flex flex-col " style={{marginBottom: "100px"}}>
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
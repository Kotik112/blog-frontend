import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Comment from "./Comment.jsx";
import { useState, useEffect } from "react";

export default function BlogPost({ id, image, comments, title, content }) {
    const navigate = useNavigate();
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (image) {
            fetchImage(image.id);
        }
    }, [image]);

    const fetchImage = async (imageId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/images/${imageId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImageData(imageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    const handleLeaveCommentClick = () => {
        navigate(`/leave-comment?blogPostId=${id}`);
    };

    return (
        <div key={id} className="mx-auto my-1 border-2 p-2" style={{ width: "600px"}}>
            {imageData && (
                <div>
                    <h3><b>Image:</b></h3>
                    <img src={imageData} alt={image.name} style={{ maxWidth: '100%' }} />
                </div>
            )}
            <h2><b>Title:</b> {title}</h2>
            <h2><b>Content:</b> {content}</h2>
            {comments.length > 0 && (
                <>
                    <h3><b>Comments:</b></h3>
                    <div className="flex flex-col">
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment}/>
                        ))}
                    </div>
                </>
            )}
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium
            rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800"
                onClick={handleLeaveCommentClick}>Leave a Comment</button>
        </div>
    );
}

BlogPost.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }),
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};
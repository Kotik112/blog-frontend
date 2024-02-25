import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Comment from "./Comment.jsx";

export default function BlogPost({ id, comments, title, content }) {
    const navigate = useNavigate();

    const handleLeaveCommentClick = () => {
        console.log('Navigating to leave-comment with postId:', id);
        navigate(`/leave-comment?blogPostId=${id}`);
    };

    return (
        <div key={id} className="mx-auto my-1 border-2 p-2" style={{ width: "600px"}}>
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
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};
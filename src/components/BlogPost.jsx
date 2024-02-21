import PropTypes from 'prop-types';
import Comment from "./Comment.jsx";

export default function BlogPost({ id, comments, title, content }) {
    return (
        <div key={id} className="m-2 p-2 border">
            <h2>Title: {title}</h2>
            <p>Content: {content}</p>
            {comments.length > 0 && (
                <>
                    <h3>Comments:</h3>
                    <div className="flex">
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment}/>
                        ))}
                    </div>
                </>
            )}
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
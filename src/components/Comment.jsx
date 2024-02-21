import PropTypes from 'prop-types';

export default function Comment({ comment }) {
    return (
        <div key={comment.id} className="m-2 p-2 border">
            <p>{comment.content}</p>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired
    }).isRequired
};
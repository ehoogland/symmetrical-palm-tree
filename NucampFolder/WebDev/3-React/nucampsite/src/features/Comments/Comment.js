import { formatDate } from '../../utils/formatDate'

const Comment = ({ comment }) => {
    const { commentText, rating, author, date } = comment

    return (
        <div className="comment">
            <p>{commentText}
                <br />
                {rating}/5 stars -- {author}, {formatDate(date)}
            </p>
        </div>
    );
};

export default Comment;

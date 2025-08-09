import Comment from './Comment';
import { selectCommentsByCampsiteId } from './commentsSlice';   

const CommentsList = ({ campsiteId }) => {
    const comments = selectCommentsByCampsiteId(campsiteId);

    if (comments && comments.length > 0) {
        return (
            <div>
                {comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                })}
            </div>
        );
    }
    return (
        <div>
            There are no comments for this campsite yet.
        </div>
    );
};

export default CommentsList;
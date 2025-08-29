import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { selectCommentsByCampsiteId } from './commentsSlice';

const CommentsList = ({ campsiteId }) => {
    // Get initial comments for this campsite
    const comments = useSelector(selectCommentsByCampsiteId(campsiteId));

    if (comments && comments.length > 0) {
        return (
            <Col md='5' className='m-1'>
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />
                })}
                <CommentForm campsiteId={campsiteId} /> 
            </Col>
        );
    }
    return (
        <Col md='5' className='m-1'>
            <h4>Comments</h4>
            <div>
                <div>There are no comments for this campsite yet.</div>
            </div>
            <CommentForm campsiteId={campsiteId} />
        </Col>
    );
};

export default CommentsList;
          
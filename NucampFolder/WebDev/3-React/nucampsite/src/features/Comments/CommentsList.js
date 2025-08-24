import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { selectCommentsByCampsiteId } from './commentsSlice';

const CommentsList = ({ campsiteId }) => {
    // Get initial comments for this campsite
    const initialComments = selectCommentsByCampsiteId(campsiteId);
    const [comments, setComments] = useState(initialComments);

    // setComments uses spread operator to add new comments. 
    // Note that it is not destructive.
    // 
    const addComment = (newComment) => {
        setComments(prevComments => [
            ...prevComments,
            {
                ...newComment,
                id: Date.now(),
                date: new Date().toISOString()
            }
        ]);
    };
// Increased number of comments displayed to 10 in order to show added feedback.
    return (
        <div>
            {comments.length > 0 ? (
                comments.slice(0, 10).map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))
            ) : (
                <div>There are no comments for this campsite yet.</div>
            )}
            <CommentForm campsiteId={campsiteId} addComment={addComment} />
        </div>
    );
};

export default CommentsList;
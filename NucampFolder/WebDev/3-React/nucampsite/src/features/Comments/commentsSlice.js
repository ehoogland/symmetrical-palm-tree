import { COMMENTS } from '../../app/shared/COMMENTS';

export const selectCommentsByCampsiteId = (campsiteId) => {
    // Filter comments to return only those that match the given campsiteId
    // This assumes that each comment has a campsiteId property
    // and that initialState is an array of comment objects.
    return COMMENTS.filter(comment => comment.campsiteId === parseInt(campsiteId));
};
import { createSlice } from '@reduxjs/toolkit';
import { COMMENTS } from '../../app/shared/COMMENTS';

// at this point we are still using the data from the local COMMENTS.js file.
// Later we will update all the slices to request and receive data from a server
const initialState = {
    commentsArray: COMMENTS
};
/**
 * Comments slice variable for managing comments state.
 * Requires the use of createSlice from Redux Toolkit (import { createSlice } from '@reduxjs/toolkit').
 * This "configuration object" that is the value of createSlice contains the initial state
 * and reducers for comments, as well as an array of comments.
 * We call this the object passed back from createSlice, as the return value bound to
 * commentsSlice will has a method on it that is the reducer for the entire commentsSlice
 * of the state.
 */
const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {}
});

export const commentsReducer = commentsSlice.reducer;

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
    // Filter comments to return only those that match the given campsiteId
    // This function operates directly on the imported COMMENTS data so it can
    // be called without useSelector in components that initialize local state.
    return state.comments.commentsArray
.filter(comment => comment.campsiteId === parseInt(campsiteId));
};
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

/**
 * @const {Function} fetchComments - Fetch comments from the server
 * @exports {Function} fetchComments -- exported for use in other parts of the application
 * @declaration {Function} createAsyncThunk
 * @description The Redux thunk action creator function fetches the comments data asynchronously.
 * async will wrap in a promise any response that is not a promise
 * @param {string} 'comments/fetchComments' - The action type used to identify this action and 
 * set up the related action names and reducers.
 * @param {Function} async () => { ... } - The payload creator function that performs the 
 * asynchronous fetch operation.
 * @return {Promise} - A promise that resolves to the array of comments or throws an error message.
 * It returns into the value of fetchComments a type of function that Redux refers to as a
 * "Redux thunk action creator".
 */
export const fetchComments = createAsyncThunk(
    'comments/fetchComments', // The action type used to identify this action and 
    // set up the related action names and reducers
    async () => {
        /** 
         * @async The Redux thunk action creator function fetches the comments data asynchronously.
         * @note async will wrap in a promise any response that is not a promise
         * @const {Response} response
         * @description Fetch comments from the server
         * Contains the logic to handle the json server request and response
         * Note that json-server is used as a mock API for development
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         * @await await the response from an asynchronous call to fetch.
         * Pass the argument to fetch(), baseUrl + 'comments' that will request the comments
         * resource from your json-server instance.
        */
       const response = await fetch(baseUrl + 'comments');
       // to test whether the failed to fetch error comes up when the resource is not found, change 'comments' to 'commentss'
       // if statement evaluates whether the response.ok property is falsy (i.e., the response was not successful).
       // If the response was not successful, it throws an error with a message that includes the response status.
       if (!response.ok) {
           throw new Error('Unable to fetch, status: ' + response.status);
        }
        /** 
         * If we get here, the response was successful and we can extract the JSON data from it.
         * @response response.json() is built into the fetch API, and it will try to convert the 
         * response body from JSON (JavaScript Object Notation) format to JavaScript object format.
         * @returns {Promise} - A promise that resolves to the array of comments.
         */
       const data = await response.json();
       return data;
    }
);

/**
 * @const {Function} postComment - Post a new comment to the server
 * @exports {Function} postComment
 * @param {Object} comment - The comment object to post (will be JSON-stringified)
 * @returns {Promise<Object>} - The created comment returned by the server
 */
export const postComment = createAsyncThunk(
    'comments/postComment', // first argument: action type
    /** second argument: payload creator function
     * @param {Object} comment - The comment object to post (will be JSON-stringified)
     * @param {Function} { dispatch } - The dispatch function from Redux (not used here but available if needed)
     * @description Post a new comment to the server
     * @async The Redux thunk action creator function posts the comment data asynchronously.
     * async will wrap in a promise any response that is not a promise
     */

    async (comment, { dispatch }) => {
        // first argument: URL, second argument: options object
        const response = await fetch(baseUrl + 'comments', { 
            // let fetch know we want to POST data
            method: 'POST',
            // The body of the request is the JSON-stringified comment object
            body: JSON.stringify(comment),
            // The headers specify that the content type is JSON
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Check whether the response is not ok (i.e., the request failed)
        if (!response.ok) { // if falsy (not truthy) ...
            // ...return a call to Promise.reject() with response status as its argument
            return Promise.reject(response.status);
        }
        // If we get here, the response was successful and we can extract the JSON data from it.
        const data = await response.json();
        dispatch(addComment(data)); // dispatch the addComment action with the new comment data.
    }
);
// Set up the initial state for the comments slice
const initialState = {
    commentsArray: [],
    isLoading: true,
    errMsg: ''   // set to error message if fetch fails.
};
/**
 * Comments slice variable for managing comments state.
 * Requires the use of createSlice from Redux Toolkit (import { createSlice } from '@reduxjs/toolkit').
 * This 'configuration object' or 'slice object' that is the value of createSlice contains the initial state
 * and reducers for comments, as well as an array of comments.
 * We call this the object passed back from createSlice, as the return value bound to
 * commentsSlice will have a method on it that is the reducer for the entire commentsSlice
 * of the state.
 * @module commentsSlice
 * @param {Object} state - The current state of the comments slice.
 * @function commentsSlice
 * @var {Object} commentsSlice
 * @property {Object} initialState - The initial state for the comments slice.
 * @property {Array} initialState.commentsArray - The array of comments for the comments slice.
 * @property {Function} commentsSlice.reducer - The reducer function for the comments slice.
 * @property {Object} reducers - The object containing all case reducers for the comments slice.
 * @method {Function} addComment - Case reducer to add a comment to the comments array.
 * @method {Function} removeComment - Case reducer to remove a comment from the comments array.
 * @exports {Function} commentsReducer
 */
const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {   
        // standard reducer logic, with auto-generated action types per reducer
        // allow manual seeding/updating of promotions in tests or dev
        // setPromotions(state, action) {
        // state.promotionsArray = action.payload;}
        addComment: (state, action) => {
            // console.log('addComment action: ', action.payload);
            // console.log('addComment state.commentsArray: ', state.commentsArray);
            const newComment = {
                id: state.commentsArray.length + 1,
                /** 
                 * Use the spread operator to spread the properties from action.payload
                 * into the newComment object. This allows us to easily add new properties
                 * to the comment object in the future without modifying this code
                 */
                ...action.payload
            };
            /**  
             * Use the push method to add the new comment to the commentsArray since React 
             * uses immer (== 'always' in German) under the hood along with React Toolkit to make immutable
             * state updates easier and more intuitive.
             */
            state.commentsArray.push(newComment);
            // console.log('addComment state.commentsArray after push: ', state.commentsArray);

        },
        removeComment: (state, action) => {
            state.commentsArray = state.commentsArray.filter(comment => comment.id !== action.payload);
        }
    },
    extraReducers: { 
        /** Use computed property name syntax because (i) we are using async thunks that need to 
         * handle the pending, fulfilled, and rejected states, and (ii) don't know the action type names ahead of time.
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
         */
        [fetchComments.pending]: (state) => {
            /** immer in Redux toolkit converts "mutating" code to safe immutable updates. Here, we don't actually
             * change the state directly, but create a new state object based on the changes we make to state.
             */
            state.isLoading = true; // immer in Redux toolkit converts "mutating" code to safe immutable updates.
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            /** 
             * Accept either an array or an object with a `comments` array.
             * @method {Function} Array.isArray() - A built-in JavaScript method that checks if a value is an array.
             * @param {any} action.payload - The payload from the fulfilled action, which can be an array or an object.
             * @returns {boolean} - Returns true if action.payload is an array, otherwise false.
             * @description This check is important because the structure of the data returned from the server
             * may vary. It could be a direct array of comments or an object containing a comments array.
             * By handling both cases, we ensure that our application can robustly process the data regardless of its format.
             * This flexibility is crucial for maintaining the integrity of the application's state and ensuring that
             * comments are correctly stored and displayed. To recap,f action.payload is an array, we use it directly.
             * If it's an object, we extract the `comments` array
             * @property [] -  use an expression in brackets [] to define an object property name, The computed property name 
             * syntax allows us to use an expression in brackets [] to define an object property name,
             * rather than a hard-coded string literal.
             * @imageURL All image URLs in the payload are also passed through the mapImageURL function to be
             * converted to absolute URLs. This is unlikely for comments, but it is a good practice to follow
             * for any data fetched from an API. It ensures that all image URLs are correctly formatted and can
             * be accessed by the browser. This is especially important if the API server is different from the
             * front end server. In such cases, relative URLs would not work correctly, and absolute URLs are needed.
             * The mapImageURL function takes care of this conversion based on the baseUrl.
             */ 
            const payload = Array.isArray(action.payload)
                ? action.payload
                : (action.payload && action.payload.comments) || [];
            /* state.commentsArray = mapImageURL(payload); --- IGNORE --- */
            state.commentsArray = payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false; // non-mutating update
            // Provide a default error message if action.error is undefined
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [postComment.rejected]: (state, action) => {
            state.isLoading = false; // non-mutating update
             // Provide a default error message if action.error is undefined
            alert('Your comment could not be posted\nError: ' + 
                (action.error ? action.error.message : 'Fetch failed'));
        }
    },
}); // end of createSlice

/**
 * Comments reducer for managing comments state.
 * This reducer will handle actions related to comments.
 * @param {Object} state - The current state of the comments slice.
 * @method {Function} commentsSlice.reducer
 * @var {Object} commentsSlice
 * @exports {Function} commentsReducer
 */
export const commentsReducer = commentsSlice.reducer;
/**
 * Destructure action creators for the comments slice. Action creators are functions
 * that return action objects. They are typically used in components to dispatch actions.
 * They are automatically generated by createSlice and are available on the slice object.
 */
export const { addComment } = commentsSlice.actions;
/**
 * Select comments by campsite ID from the Redux state.
 * @param {number} campsiteId - The ID of the campsite to filter comments by.
 * @returns {Array} - An array of comments associated with the specified campsite ID.
 * @exports {Function} selectCommentsByCampsiteId
 */
export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
/** 
 * Filter comments to return only those that match the given campsiteId
 * This function operates directly on the imported COMMENTS data so it can
 * be called without useSelector in components that initialize local state.
 */
    return state.comments.commentsArray
.filter(comment => comment.campsiteId === parseInt(campsiteId));
};
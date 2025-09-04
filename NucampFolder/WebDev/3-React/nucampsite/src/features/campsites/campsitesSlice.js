// use lowercase file names for any files that do not export 
// a React component (e.g., data, utility functions)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';
// import { CAMPSITES } from '../../app/shared/CAMPSITES'; -- no longer using this local data

/**
 * @description action to fetch campsites from the server and map the image URLs
 * If the fetch fails, the promise is rejected with an error message including the status code
 * If the fetch is successful, the promise is resolved with the array of campsites
 * @exports {Function} fetchCampsites -- the function is exported for use in other parts of the application
 * @returns {Promise} - A promise that resolves to the array of campsites. 
 * @note async will wrap in a promise any response that is not a promise
 * @createAsyncThunk The call to createAsyncThunk() will 
 * @return into the value of fetchCampsites a type of function that Redux
 * calls a "Redux thunk action creator".
 * @async The Redux thunk action creator function fetches the
 * campsites data in an asynchronous way.
 */
export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites', // The action type used to identify this action and
    // set up the related action names and reducers
    async () => {
        // Fetch campsites from the server
        // Contains the logic to handle the json server request and response
        // Note that json-server is used as a mock API for development
        // Set up constant variable to contain the value when the fetch call is resolved
        // If the response is not ok, the promise is rejected with an error message
        // If the response is successful, the promise is resolved with the array of campsites
        const response = await fetch(baseUrl + 'campsites');
        if (!response.ok) { // if falsy
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        // If the response is successful, the promise is resolved with the array of campsites
        // response.json() is built into the fetch API, and it will try to convert the response
        // body from JSON format to JavaScript object format
        const data = await response.json();
        return data;
    }
);

// set up the initial state object for the campsites slice
const initialState = {
    campsitesArray: [],
    isLoading: true,
    errMsg: ''   // since we don't initially have any error messages
};

// set up the campsites slice with the name of campsites, and it
// contains the initial state for the array of campsites
// fetchCampsites thunk and our reducers make sure the state is updated correctly
const campsitesSlice = createSlice({
    name: 'campsites',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCampsites.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchCampsites.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.campsitesArray = mapImageURL(action.payload);
            // Map image paths to full URLs based on baseUrl so the browser
            // will request images from the API server (not the frontend origin).
            // state.campsitesArray = action.payload; --- IGNORE ---
        },
        [fetchCampsites.rejected]: (state, action) => {
            state.isLoading = false;
            // Debug log removed - issue resolved. Keep errMsg for UI consumption.
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }

});

/**
 * Select and export all campsites
 * @module campsitesSlice
 * @exports {Function} selectAllCampsites
 * @exports {Function} selectFeaturedCampsite
 * @exports {Function} selectCampsiteById
*/

/**
 * When the following functions are called back by React's useSelector,
 * useSelector has access to the Redux store state, and useSelector will pass
 * the global state variable to selectAllCampsites.
 *
 * selectFeaturedCampsite will receive it via their parameter list (state), and then 
 * use state.campsites.campsitesArray for its return value.
*/

/**
 * Select all campsites from the Redux state.
 * @param {Object} state - The Redux state
 * @returns {Array} - The array of campsites
*/
export const selectAllCampsites = (state) => {
    return state.campsites.campsitesArray;
};

/**
 * Select a featured campsite from the Redux state.
 * @param {Object} state - The Redux state
 * @returns {Object} - An object containing the featured campsite, isLoading, and errMsg properties.
*/
export const selectFeaturedCampsite = (state) => {
    return {
        featuredItem: state.campsites.campsitesArray.find(
            campsite => campsite.featured
        ),
        isLoading: state.campsites.isLoading,
        errMsg: state.campsites.errMsg
    };
};
/**
 * [F]ind is a higher-order function that returns the first element in the array
 * that satisfies the provided testing function. In this case, it returns the campsite
 * with the matching id. If no campsite is found, it returns undefined.
 * This function takes a callback function as its argument. This pure function
 * does not modify the state or have any side effects.
 * To write the function and export it at the same time, 
 * use the following syntax:
 */
/**
 * Select a campsite by its ID from the Redux state.
 * @param {number} id - The ID of the campsite to select
 * @returns {Object|undefined} - The campsite object if found, otherwise undefined.
 */
export const selectCampsiteById = (id) => (state) => {
    return state.campsites.campsitesArray.find(campsite => campsite.id === parseInt(id));
};
export const campsitesReducer = campsitesSlice.reducer;

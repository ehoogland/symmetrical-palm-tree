// use lowercase file names for any files that do not export 
// a React component (e.g., data, utility functions)
import { createSlice } from '@reduxjs/toolkit';
// use all caps for files that export a React component
import { CAMPSITES } from '../../app/shared/CAMPSITES';

const initialState = {
    campsitesArray: CAMPSITES
};
// set up the campsites slice with the name of campsites, and it
// contains the initial state, for now just the array of campsites from
// the local campsites.js file.
// At first, we will not define any reducers.
const campsitesSlice = createSlice({
    name: 'campsites',
    initialState
    
});
/** 
 * We've pulled out the campsites slice reducer, though we have not defined any
 * case reducers yet, since we don't yet need any way to update the campsites data. 
 */
export const campsitesReducer = campsitesSlice.reducer;
/** 
 * When these functions are called back by React's useSelector, useSelector has access to
 * the Redux store state, and useSelector will pass the global state variable
 * to selectAllCampsites and selectFeaturedCampsite will receive it via their
 * parameter list (state), then they will use state.campsites.campsitesArray for its
 * return value.
 * 
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
 * @returns {Object|undefined} - The featured campsite object if found, otherwise undefined.
*/
export const selectFeaturedCampsite = (state) => {
    return state.campsites.campsitesArray.find(campsite => campsite.featured);
};
export const selectCampsiteById = (id) => (state) => {
    return state.campsites.campsitesArray.find(campsite => campsite.id === parseInt(id));
};



/** This is commented to avoid confusion with the toggleCampsite 
 * function in CampsitesDirectoryPage.js and as instructed in the second
 * Hooks exercise useState(). 
 * 
 * This function was fine as a placeholder, but now that
 * we have a Redux store, we can use the selectAllCampsites() function to
 * get all campsites and then select a random one from that array.
 * To select a random campsite from the array, we can use the Math.random()
 * function to generate a random index.
 * 
 * export const selectRandomCampsite = () => {
 * const campsites = selectAllCampsites();
 * return campsites[Math.floor(campsites.length * Math.random())];
 * };
 * export const selectRandomCampsite = () => {
 * return CAMPSITES[Math.floor(CAMPSITES.length * Math.random())];
 * };
 */

/**
 * [F]ind is a higher-order function that returns the first element in the array
 * that satisfies the provided testing function. In this case, it returns the campsite
 * with the matching id. If no campsite is found, it returns undefined.
 * This function takes a callback function as its argument. This pure function
 * does not modify the state or have any side effects.
 * To write the function and export it at the same time, 
 * use the following syntax:
 */

export const selectCampsitesById = (id) => {
    return CAMPSITES.find(campsite => campsite.id === parseInt(id));
};

export const selectFeaturedCampsiteFromData = () => {
    // Find the first campsite that is featured
    // by checking if the featured property is true
    // and return it.
    return CAMPSITES.find(campsite => campsite.featured);
};
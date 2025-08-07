import { CAMPSITES } from '../../app/shared/CAMPSITES';
// use lowercase file names for any files that do not export 
// a React component (e.g., data, utility functions)

/** Selector function that returns all of the campsites from the CAMPSITES array.
 * This function is used to access the CAMPSITES data in a Redux store.
 * This is a pure function that does not modify the state or perform any side effects.
 * To write the function and export it at the same time, 
 * use the following syntax:
 */
export const selectAllCampsites = () => {
    return CAMPSITES;
};

export const selectRandomCampsite = () => {
    return CAMPSITES[Math.floor(CAMPSITES.length * Math.random())];
}
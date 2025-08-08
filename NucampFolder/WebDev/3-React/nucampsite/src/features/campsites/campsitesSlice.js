import { CAMPSITES } from '../../app/shared/CAMPSITES';
// use lowercase file names for any files that do not export 
// a React component (e.g., data, utility functions)




export const selectAllCampsites = () => {
    return CAMPSITES;
};
/*
*/
/** This is commented to avoid confusion with the toggleCampsite 
 * function in CampsitesDirectoryPage.js and as instructed in the second
 * Hooks exercise useState(). This function was fine as a placeholder, but now that
 * we have a Redux store, we can use the selectAllCampsites() function to
 * get all campsites and then select a random one from that array.
 * export const selectRandomCampsite = () => {
 * const campsites = selectAllCampsites();
 * return campsites[Math.floor(campsites.length * Math.random())];
 * };
 * export const selectRandomCampsite = () => {
 * return CAMPSITES[Math.floor(CAMPSITES.length * Math.random())];
 * };
 *
 * [F]ind is a higher-order function that returns the first element in the array
 * that satisfies the provided testing function. In this case, it returns the campsite
 * with the matching id. If no campsite is found, it returns undefined.
 * This function takes a callback function as its argument. This pure function
 * does not modify the state or have any side effects.
 * To write the function and export it at the same time, use the following syntax:
 */
export const selectCampsitesById = (id) => {
    return CAMPSITES.find(campsite => campsite.id === id);
};

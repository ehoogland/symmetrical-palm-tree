import { createSlice } from '@reduxjs/toolkit';
import { PARTNERS } from '../../app/shared/PARTNERS';

const initialState = {
  partners: PARTNERS
};
/** 
 * createSlice is used to create a configuration object
 * for the partners slice of the Redux store.
 * The object passed to createSlice contains the name of the slice,
 * the initial state, and the reducers for the slice.
 *
 * @module partnersSlice
 *
 * This module contains the Redux slice for managing partners data.
 */
const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {}
});
// Update all of the partners selector functions to use Redux state

/** Sets the value of selectAllPartners const to an arrow function that 
 * returns the PARTNERS array
 *
 * @param {Object} state - The Redux state
 * @returns {Array} - The array of all partners
 */
export const selectAllPartners = (state) => {
    return state.partners.partners;
};
/**
 * Select featured partners from the Redux state
 * @param {Object} state - The Redux state
 * @returns {Array} - The array of featured partners
 *
 * Sets the value of selectFeaturedPartner const to an arrow function that
 * finds the first partner with a truthy featured property
 * from the PARTNERS array of objects, returns that partner object, and exports it.
 */
export const selectFeaturedPartner = (state) => {
    return state.partners.partners.find(partner => partner.featured);
};
/**
 * The reducer for the partners slice
 * @module partnersSlice
 * @requires PARTNERS
 */
export default partnersSlice.reducer;

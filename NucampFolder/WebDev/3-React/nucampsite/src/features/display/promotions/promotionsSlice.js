import { createSlice } from '@reduxjs/toolkit';
import { PROMOTIONS } from '../../../app/shared/PROMOTIONS';

// use lowercase file names for any files that do not export 
// a React component (e.g., data, utility functions)

/**
 * Initial state for the promotions slice
 */
const initialState = {
    promotionsArray: PROMOTIONS
};
/**
 * Promotions slice
 */
const promotionsSlice = createSlice({
    name: 'promotions',
    initialState
});
/**
 * Promotions reducer
 */
export const promotionsReducer = promotionsSlice.reducer;
/**
 * Select a featured promotion
 * @param {Object} state - The Redux state
 * @returns {Object} - The featured promotion or undefined
 */
export const selectFeaturedPromotion = (state) => {
    /* Find the first promotion that is featured
       by checking if the featured property is true
       and return it. */
    return state.promotions.promotionsArray.find(promotion => promotion.featured);
};
import { createSlice } from '@reduxjs/toolkit';
import { PROMOTIONS } from '../../../app/shared/PROMOTIONS';

// Temporary runtime check - logs the imported promotions array when this module loads
// console.log('PROMOTIONS imported in promotionsSlice:', PROMOTIONS);

const initialState = {
    promotions: PROMOTIONS,
};

const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {
        // reducer added so the slice has at least one reducer
        // store.js as displayed in VSCode using Prettier had highlighted
        // the promotions slice differently than the other slices.
        setPromotions(state, action) {
            state.promotions = action.payload;
        },
    },
});

export const selectFeaturedPromotion = (state) =>
    state.promotions.promotions.find((promotion) => promotion.featured);

// Export the generated action so other parts of the app can update promotions if needed.
export const { setPromotions } = promotionsSlice.actions;

// Export the promotions reducer
export const promotionsReducer = promotionsSlice.reducer;
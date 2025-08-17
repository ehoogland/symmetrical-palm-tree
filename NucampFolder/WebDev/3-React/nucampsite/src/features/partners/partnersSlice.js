import { PARTNERS } from '../../app/shared/PARTNERS';
import { createSlice } from '@reduxjs/toolkit';

const initialState = PARTNERS;

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {}
});

// Sets the value of selectAllPartners const to an arrow function that returns the PARTNERS array
export const selectAllPartners = () => {
    return PARTNERS;
};
// Sets the value of selectFeaturedPartners const to an arrow function that 
// finds the first partner with a truthy featured property 
// from the PARTNERS array of objects, returns that partner object, and exports it.
export const selectFeaturedPartners = () => {

   
    // Find the first partner that is featured
    // by checking if the featured property is true
    // and return it.
    return PARTNERS.find(partner => partner.featured);
}
export default partnersSlice.reducer;

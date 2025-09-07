import { createSlice } from '@reduxjs/toolkit';

/**
 * Migration note: `uiSlice` doesn't use `extraReducers` and therefore
 * didn't require conversion to the builder callback form. We add this
 * comment for consistency across slice files and to make the codebase
 * easier to review.
 */
const initialState = {

  showSubscribe: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMockData(state) {
  // removed useMockData toggle
    },
    setMockData(state, action) {
  // removed useMockData set
    },
    toggleSubscribe(state) {
      state.showSubscribe = !state.showSubscribe;
    },
    setSubscribe(state, action) {
      state.showSubscribe = !!action.payload;
    },
  },
});

export const { toggleMockData, setMockData, toggleSubscribe, setSubscribe } = uiSlice.actions;
export default uiSlice.reducer;

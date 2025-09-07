import { createSlice } from '@reduxjs/toolkit';
/** @typedef {import('../../../types').RootState} RootState */

/**
 * UI slice
 *
 * Contains small UI flags used across the app. No async reducers are defined.
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

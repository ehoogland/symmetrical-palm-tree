import { createSlice } from '@reduxjs/toolkit';
/** @typedef {import('../../../types').RootState} RootState */
/** A typedef is a lightweight way to describe the shape of an object for editor tooling.
 * By shape I mean the object's properties and their types. Editor tooling includes
 * VS Code IntelliSense and JSDoc-aware tools.
 */
/**
 * UI slice
 * Reducer for UI state
 * Reducers are functions that take the current state and an action
 * and return a new state based on the action type and payload.
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

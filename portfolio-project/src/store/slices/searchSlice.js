import { createSlice } from '@reduxjs/toolkit';
/** @typedef {import('../../../types').RecipeSummary} RecipeSummary */

/**
 * Search slice
 *
 * State shape:
 * {
 *   query: string,
 *   results: Array<Object>,
 *   loading: boolean,
 *   error: string|null,
 * }
 *
 * Note: No extraReducers used here.
 */
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload || [];
    },
    setLoading(state, action) {
      state.loading = !!action.payload;
    },
    setError(state, action) {
      state.error = action.payload || null;
    },
    clearResults(state) {
      state.results = [];
    }
  }
});

export const { setQuery, setResults, setLoading, setError, clearResults } = searchSlice.actions;
export default searchSlice.reducer;

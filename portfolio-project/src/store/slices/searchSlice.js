import { createSlice } from '@reduxjs/toolkit';

/**
 * Migration note: this slice does not use `extraReducers` (object-style)
 * and therefore did not require migration to the builder callback API.
 * Keeping this note here for consistency with other slices that were
 * migrated; no functional changes are made below.
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

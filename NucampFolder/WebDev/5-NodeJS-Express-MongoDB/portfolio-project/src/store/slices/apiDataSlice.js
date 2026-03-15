import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/** @typedef {import('../../../types').RootState} RootState */

// Adjust the endpoint as needed for your mock server
const API_URL = 'http://localhost:3000/your-endpoint';

/**
 * ApiData slice
 * Note: a state shape in JSDocis defined as a lightweight way to describe the structure
 * of an object for editor tooling. Here, the state shape describes the properties
 * and their types in the Redux slice state managed by this reducer.
 * 
 * State shape:
 * {
 *   data: any,
 *   loading: boolean,
 *   error: string|null,
 * }
 * Thunks:
 * - fetchApiData(): fetches data from a mock API endpoint
 * 
 * A thunk is a function that wraps an expression to delay its evaluation.
 * In Redux, thunks are used to handle asynchronous operations, such as API calls,
 * by allowing action creators to return functions instead of plain action objects.
 * This enables dispatching actions conditionally and after asynchronous tasks complete.
 * 
 * The thunk `fetchApiData` fetches data from a mock API endpoint and handles loading
 * and error states. It uses `createAsyncThunk` from Redux Toolkit to simplify the
 * creation of thunks that handle async logic and dispatch actions based on promise
 * lifecycle (pending, fulfilled, rejected).
 */
export const fetchApiData = createAsyncThunk(
  'apiData/fetchApiData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  /**
   * Migration note: moved from object-style `extraReducers` to the
   * builder callback notation to remove a deprecation warning from Redux Toolkit,  
   * a library that provides a set of tools and best practices for efficient Redux development.
   * The previous object-based handlers are preserved below as comments
   * for easier code review.
   *
   * Previous handlers (commented):
   *
   * // extraReducers: {
   * //   [fetchApiData.pending]: (state) => {
   * //     state.loading = true;
   * //     state.error = null;
   * //   },
   * //   [fetchApiData.fulfilled]: (state, action) => {
   * //     state.loading = false;
   * //     state.data = action.payload;
   * //   },
   * //   [fetchApiData.rejected]: (state, action) => {
   * //     state.loading = false;
   * //     state.error = action.payload;
   * //   },
   * // },
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiDataSlice.reducer;

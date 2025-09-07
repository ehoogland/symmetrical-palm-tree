import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Adjust the endpoint as needed for your mock server
const API_URL = 'http://localhost:3000/your-endpoint';

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
   * builder callback notation to remove a deprecation warning from RTK.
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

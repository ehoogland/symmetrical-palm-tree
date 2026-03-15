import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/** @typedef {import('../../../types').FavoriteItem} FavoriteItem */

/**
 * Favorites slice
 *
 * State shape:
 * {
 *   list: FavoriteItem[],
 *   loading: boolean,
 *   error: string|null,
 * }
 *
 * Thunks:
 * - fetchFavorites(): load favourites from the dev server
 * - addFavorite(favorite): persist a favorite (stores spoonacularId)
 * - removeFavorite(id): deletes by server id or stored spoonacularId
 */
const API_URL = 'http://localhost:3000/favorites';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch favorites');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (favorite, { rejectWithValue }) => {
    try {
      // Persist the Spoonacular id on the server as `spoonacularId` and let json-server assign its own `id`.
      const body = { ...favorite, spoonacularId: favorite.id };
      // Ensure we don't send a client `id` that could conflict with json-server
      delete body.id;
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to add favorite');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (id, { rejectWithValue }) => {
    try {
  // Find the resource on the server by either json-server `id` or stored `spoonacularId`
  const listRes = await fetch(API_URL);
  if (!listRes.ok) throw new Error('Failed to query favorites');
  const contentType = listRes.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await listRes.text();
    console.error('Expected JSON from /favorites but received:', text.slice(0, 400));
    throw new Error('Server returned non-JSON response when querying favorites');
  }
  const list = await listRes.json();
  const found = list.find(f => String(f.id) === String(id) || String(f.spoonacularId) === String(id));
  if (!found) throw new Error('Favorite not found on server');
  const resourceId = found.id;
  const delRes = await fetch(`${API_URL}/${resourceId}`, { method: 'DELETE' });
  if (!delRes.ok) {
    const text = await delRes.text();
    console.error('Failed to delete favorite. Server response:', text.slice(0, 400));
    throw new Error('Failed to remove favorite');
  }
  const delContentType = delRes.headers.get('content-type') || '';
  if (!delContentType.includes('application/json')) {
    const text = await delRes.text();
    console.error('Expected JSON from DELETE /favorites but received:', text.slice(0, 400));
    // return spoonacularId anyway so UI can update optimistically
    return found.spoonacularId ?? found.id;
  }
  // Return the spoonacularId so the UI can remove by that identifier
  return found.spoonacularId ?? found.id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  /**
   * Migration note: switched from object-style `extraReducers` to the
   * builder callback notation to follow Redux Toolkit recommendations
   * and remove deprecation warnings. The previous object mapping is
   * left commented below for easy comparison.
   *
   * Previous handlers (commented):
   *
   * // extraReducers: {
   * //   [fetchFavorites.pending]: (state) => {
   * //     state.loading = true;
   * //     state.error = null;
   * //   },
   * //   [fetchFavorites.fulfilled]: (state, action) => {
   * //     state.loading = false;
   * //     state.list = action.payload;
   * //   },
   * //   [fetchFavorites.rejected]: (state, action) => {
   * //     state.loading = false;
   * //     state.error = action.payload;
   * //   },
   * //   [addFavorite.fulfilled]: (state, action) => {
   * //     state.list.push(action.payload);
   * //   },
   * //   [removeFavorite.fulfilled]: (state, action) => {
   * //     const payload = String(action.payload);
   * //     state.list = state.list.filter(f => String(f.id) !== payload && String(f.spoonacularId || '') !== payload);
   * //   },
   * // },
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const payload = String(action.payload);
        state.list = state.list.filter(f => String(f.id) !== payload && String(f.spoonacularId || '') !== payload);
      });
  },
});

export default favoritesSlice.reducer;

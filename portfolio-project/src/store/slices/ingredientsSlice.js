import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Ingredients slice
 *
 * State shape:
 * {
 *   veganList: Array<Object>,
 *   selected: Array<Object>,
 *   loading: boolean,
 *   error: string|null,
 * }
 */
const API_URL = 'http://localhost:3000/ingredients';

// Async thunks for CRUD
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch ingredients');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addIngredient = createAsyncThunk(
  'ingredients/add',
  async (ingredient, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
      });
      if (!res.ok) throw new Error('Failed to add ingredient');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateIngredient = createAsyncThunk(
  'ingredients/update',
  async (ingredient, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${ingredient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
      });
      if (!res.ok) throw new Error('Failed to update ingredient');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  'ingredients/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete ingredient');
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    veganList: [],
    selected: [],
    loading: false,
    error: null,
  },
  reducers: {
    setVeganList(state, action) {
      state.veganList = action.payload || [];
    },
    toggleSelectedIngredient(state, action) {
      const ing = action.payload;
      const exists = state.selected.find(i => i && i.name === (ing && ing.name));
      if (exists) {
        state.selected = state.selected.filter(i => i.name !== ing.name);
      } else {
        state.selected.push(ing);
      }
    },
    clearSelected(state) {
      state.selected = [];
    }
  },
  /**
   * Migration note: switched from object-style `extraReducers` to the
   * "builder callback" notation to avoid the RTK deprecation warning and
   * to be compatible with RTK 2.x+.
   *
   * Kept the previous object-style handlers commented below for
   * quick comparison during review. They were removed because the
   * object notation is deprecated (lossy typings and limited matcher
   * capabilities). The builder API is the recommended pattern.
   *
   * Previous handlers (commented):
   *
   * // extraReducers: {
   * //   [fetchIngredients.pending]: (state) => {
   * //     state.loading = true;
   * //     state.error = null;
   * //   },
   * //   [fetchIngredients.fulfilled]: (state, action) => {
   * //     state.loading = false;
   * //     state.veganList = action.payload;
   * //   },
   * //   [fetchIngredients.rejected]: (state, action) => {
   * //     state.loading = false;
   * //     state.error = action.payload;
   * //   },
   * //   [addIngredient.fulfilled]: (state, action) => {
   * //     state.veganList.push(action.payload);
   * //   },
   * //   [updateIngredient.fulfilled]: (state, action) => {
   * //     const idx = state.veganList.findIndex(i => i.id === action.payload.id);
   * //     if (idx !== -1) state.veganList[idx] = action.payload;
   * //   },
   * //   [deleteIngredient.fulfilled]: (state, action) => {
   * //     state.veganList = state.veganList.filter(i => i.id !== action.payload);
   * //   },
   * // },
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.veganList = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addIngredient.fulfilled, (state, action) => {
        state.veganList.push(action.payload);
      })
      .addCase(updateIngredient.fulfilled, (state, action) => {
        const idx = state.veganList.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.veganList[idx] = action.payload;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.veganList = state.veganList.filter(i => i.id !== action.payload);
      });
  },
});

export const { setVeganList, toggleSelectedIngredient, clearSelected } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

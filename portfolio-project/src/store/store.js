/**
 * Redux store implementation.
 *
 * This file contains the concrete `configureStore` call. It was split
 * out from `src/store/index.js` to provide a clearer file name when
 * importing the store as `src/store/store.js`.
 *
 * Exports:
 *   - default: the configured Redux store
 *
 * RootState typedef is provided in `src/store/index.js` which re-exports
 * this module for backwards compatibility.
 */
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import searchReducer from './slices/searchSlice';
import uiReducer from './slices/uiSlice';
import apiDataReducer from './slices/apiDataSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    ingredients: ingredientsReducer,
    search: searchReducer,
    ui: uiReducer,
    apiData: apiDataReducer,
  },
});

export default store;


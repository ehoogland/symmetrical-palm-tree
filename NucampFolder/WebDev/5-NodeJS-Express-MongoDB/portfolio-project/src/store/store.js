/**
 * Redux store implementation
 *
 * Configures the Redux store used by the app. This module exports the
 * configured store as the default export. The `RootState` typedef is
 * provided in `src/store/index.js` for editor tooling and JSDoc consumers.
 * A typedef is a lightweight way to describe the shape of an object for editor tooling.
 * By shape I mean the object's properties and their types. Editor tooling includes
 * VS Code IntelliSense and JSDoc-aware tools.
 *
 * Reducers included:
 * - favorites
 * - ingredients
 * - search
 * - ui
 * - apiData
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


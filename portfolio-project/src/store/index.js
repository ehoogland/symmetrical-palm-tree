/**
 * Redux store
 *
 * The configureStore call wires together the app slices. Exporting the
 * configured store makes it easy to provide to React tests using a
 * `<Provider store={store}>` wrapper.
 */
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import searchReducer from './slices/searchSlice';
import uiReducer from './slices/uiSlice';
import apiDataReducer from './slices/apiDataSlice';

/**
 * @typedef {Object} RootState
 * @property {import('./slices/favoritesSlice').default} favorites
 * @property {import('./slices/ingredientsSlice').default} ingredients
 * @property {import('./slices/searchSlice').default} search
 * @property {import('./slices/uiSlice').default} ui
 * @property {import('./slices/apiDataSlice').default} apiData
 */

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

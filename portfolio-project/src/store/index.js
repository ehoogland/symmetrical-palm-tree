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

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RecipeDetails from './components/RecipeDetails';
import RecipesPage from './pages/RecipesPage';
import IngredientsPage from './pages/IngredientsPage';
import FavoritesPage from './pages/FavoritesPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RecipesPage /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'ingredients', element: <IngredientsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'recipe/:id', element: <RecipeDetails /> },
      { path: '*', element: <RecipesPage /> },
    ],
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

export default router;

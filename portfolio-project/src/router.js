import { createBrowserRouter, Navigate } from 'react-router-dom';
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
      // This route will catch all unmatched paths and redirect to home
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
/**
 * Create the router instance with the defined routes.
 */
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

export default router;

/**
 * Application entrypoint
 *
 * This file bootstraps the React app and documents a couple of important
 * runtime behaviors to keep in mind:
 *
 * - In development only, we dynamically start an in-browser mock server that
 *   intercepts fetch requests for the dev JSON API. This keeps the live
 *   Spoonacular service available but provides a local persistence layer for
 *   ingredients/favorites during development. The mock server is only loaded
 *   when `process.env.NODE_ENV === 'development'` so it is excluded from
 *   production bundles.
 *
 * - The app is wrapped with react-redux's `Provider` and react-router's
 *   `BrowserRouter` so routes are reflected in the browser URL and the store
 *   is the single source of truth for ingredients/favorites.
 *
 * Deployment note (serving the built app from a json-server public folder):
 * - You can copy the contents of `build/` into a `public/` folder served by
 *   json-server to host static assets alongside the API. Keep the mock server
 *   client out of production by ensuring `NODE_ENV` is `production` when
 *   building — the dynamic import is already gated by the `development` env.
 *   Gated means that the code is conditionally included based on the environment.
 *   This way the mock server code is not included in production bundles.
 *
 * Deployment note (serving the built app from a static file server):
 * - Run json-server to serve API endpoints (e.g., favorites/ingredients) and
 *   the static files from `public/`. Do not enable the in-browser mock server
 *   in that environment; instead let json-server act as the persistent dev API.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import RecipesPage from './pages/RecipesPage';
import IngredientsPage from './pages/IngredientsPage';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetails from './components/RecipeDetails';
import { Provider } from 'react-redux';
import store from './store';

// Start simple in-browser mock server in development
if (process.env.NODE_ENV === 'development') {
  import('./mocks/mockServer').then(({ startMockServer }) => startMockServer());
}

const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<RecipesPage />} />
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="ingredients" element={<IngredientsPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="recipe/:id" element={<RecipeDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

if (process.env.NODE_ENV === 'development') {
  import('./mocks/mockServer').then(({ startMockServer }) => {
    startMockServer();
    renderApp();
  }).catch((err) => {
    console.error('Failed to start mock server', err);
    renderApp();
  });
} else {
  renderApp();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

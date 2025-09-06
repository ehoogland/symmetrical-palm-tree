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

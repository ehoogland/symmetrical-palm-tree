import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { veganIngredientList } from "./data/veganIngredientsClean";
import './styles/vegan-theme.css';
import SubscribeForm from './components/SubscribeForm';

export const AppContext = React.createContext(null);

function App() {
  // Toggle for mock data
  const [useMockData, setUseMockData] = useState(false);
  const handleToggleMockData = () => setUseMockData(prev => !prev);

  // Manage state
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set()); // Track IDs in a Set for fast lookup

  // Load favorites from localStorage when the app starts up
  useEffect(() => {
    const savedFavorites = localStorage.getItem('veganAppFavorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
      setFavoriteIds(new Set(parsedFavorites.map(recipe => recipe.id)));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('veganAppFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients(prev => {
      const isSelected = prev.some(item => item.name === ingredient.name);
      if (isSelected) {
        return prev.filter(item => item.name !== ingredient.name);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const clearSelectedIngredients = () => setSelectedIngredients([]);

  const isIngredientSelected = (ingredient) => selectedIngredients.some(item => item.name === ingredient.name);

  const addToFavorites = (recipe) => {
    if (favoriteIds.has(recipe.id)) return;
    setFavorites(prev => [...prev, recipe]);
    setFavoriteIds(prev => new Set([...prev, recipe.id]));
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== recipeId));
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(recipeId);
      return newSet;
    });
  };

  const isRecipeFavorite = (recipeId) => favoriteIds.has(recipeId);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const toggleSubscribe = () => setShowSubscribe(s => !s);

  return (
    <div>
      {/* Mock data toggle switch */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '1rem' }}>
        <label htmlFor="use-mock-data" style={{ marginRight: '0.5rem', fontWeight: 'bold', color: '#4a7c59' }}>
          Use Mock Data
        </label>
        <input
          id="use-mock-data"
          name="useMockData"
          type="checkbox"
          checked={useMockData}
          onChange={handleToggleMockData}
          style={{ width: '1.5rem', height: '1.5rem' }}
        />
      </div>

      {/* Vegan-themed header */}
      <div className="vegan-header">
        <div className="container text-center">
          <h1>🌱 Vegan Ingredients & Recipes</h1>
          <p className="subtitle">Discover plant-based ingredients and find delicious vegan recipes</p>
          {/* Navigation Tabs as Links */}
          <div className="nav-tabs-container mt-4">
            <div className={`btn-group ${showSubscribe ? 'subscribe-open' : ''}`} role="group">
              <NavLink to="/ingredients" className="btn btn-vegan-outline btn-ingredients">
                🥬 Ingredients ({veganIngredientList.length})
              </NavLink>
              <NavLink to="/recipes" className="btn btn-vegan-outline btn-recipes">
                🔍 Recipe Search
              </NavLink>
              <NavLink to="/favorites" className="btn btn-vegan-outline btn-favorites">
                ❤️ Favorites ({favorites.length})
              </NavLink>
              <button
                type="button"
                className={`btn btn-vegan-outline btn-subscribe ${showSubscribe ? 'active' : ''}`}
                onClick={toggleSubscribe}
                aria-pressed={showSubscribe}
              >
                🔔 Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

  <AppContext.Provider value={{
        veganIngredientList,
        selectedIngredients,
        handleIngredientSelect,
        clearSelectedIngredients,
        isIngredientSelected,
        searchResults,
        setSearchResults,
        loading,
        setLoading,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isRecipeFavorite,
        useMockData,
      }}>
  {showSubscribe ? <SubscribeForm onClose={() => setShowSubscribe(false)} /> : <Outlet />}
      </AppContext.Provider>

      {/* Sustainability footer */}
      <div className="vegan-footer">
        <div className="container">
          <p className="sustainability-message">
            🌍 "Every plant-based meal is a step toward a more sustainable future" 🌿
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

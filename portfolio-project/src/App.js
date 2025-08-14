import React, { useState, useEffect } from 'react';
import IngredientCard from "./IngredientCard";
import { veganIngredientList } from "./data/veganIngredientsClean";
import RecipeSearch from "./components/RecipeSearch";
import './styles/vegan-theme.css';

function App() {
  // Manage state
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set()); // Track IDs in a Set for fast lookup
  const [currentView, setCurrentView] = useState('recipes'); // 'ingredients' | 'recipes' | 'favorites'
  
  // Load favorites from localStorage when the app starts up
  useEffect(() => {
    const savedFavorites = localStorage.getItem('veganAppFavorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
      // Also populate the Set with IDs for fast lookup
      setFavoriteIds(new Set(parsedFavorites.map(recipe => recipe.id)));
    }
  }, []);// ← Empty dependency array means run this component only ONCE when component mounts. It is like
  // saying "when the app starts up and the component mounts check if the user has saved favorites"

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('veganAppFavorites', JSON.stringify(favorites));
  }, [favorites]); // Why [favorites] at the end? Because we want to run this effect whenever the 
  // favorites change, ensuring that the latest favorites are saved to localStorage.
  // Dependency array with favorites ( [favorites] ), means "run this effect whenever favorites changes"

  // Ingredient selection handlers

  // Why the prev parameter?
  // Note the prev parameter starts as the existing state value but is updated with each click.

  // If user clicks two ingredients very quickly:
  // Click 1: setSelectedIngredients(prev => [...prev, spinach])
  // Click 2: setSelectedIngredients(prev => [...prev, carrots])

  // With prev: Each update gets the actual current state
  // Without prev: Both might use the same stale state value

  // *.some(item => item.name === ingredient.name) tests whether AT LEAST ONE element in the array
  // passes the test in the function, and returns boolean true or false (note: not truthy falsy like .find()).
  // prev refers to the previous state value
  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients(prev => {
      const isSelected = prev.some(item => item.name === ingredient.name);
      if (isSelected) {
        // Remove ingredient if already selected
        return prev.filter(item => item.name !== ingredient.name);
      } else {
        // Add ingredient if not selected
        // Using spread operator to create a new array with the ingredient added. Unlike push()
        // it does not mutate the original array, whereas concat creates a new array but can be 
        // less intuitive.
        return [...prev, ingredient];
      }
    });
  };

  const clearSelectedIngredients = () => {
    setSelectedIngredients([]);
  };
  
  const isIngredientSelected = (ingredient) => {
    return selectedIngredients.some(item => item.name === ingredient.name);
  };
  
  // Favorites management functions with Set-based duplicate prevention
  const addToFavorites = (recipe) => {
    // Check if recipe is already in favorites using Set for O(1) lookup
    if (favoriteIds.has(recipe.id)) {
      return; // Recipe already in favorites
    }
    
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
  
  const isRecipeFavorite = (recipeId) => {
    return favoriteIds.has(recipeId);
  };

  return (
    <div>
      {/* Vegan-themed header */}
      <div className="vegan-header">
        <div className="container text-center">
          <h1>🌱 Vegan Ingredients & Recipes</h1>
          <p className="subtitle">Discover plant-based ingredients and find delicious vegan recipes</p>
          
          {/* Navigation Tabs */}
          <div className="nav-tabs-container mt-4">
            <div className="btn-group" role="group">
              <button
                className={`btn ${currentView === 'ingredients' ? 'btn-vegan' : 'btn-vegan-outline'}`}
                onClick={() => setCurrentView('ingredients')}
              >
                🥬 Ingredients ({veganIngredientList.length})
              </button>
              <button
                className={`btn ${currentView === 'recipes' ? 'btn-vegan' : 'btn-vegan-outline'}`}
                onClick={() => setCurrentView('recipes')}
              >
                🔍 Recipe Search
              </button>
              <button
                className={`btn ${currentView === 'favorites' ? 'btn-vegan' : 'btn-vegan-outline'}`}
                onClick={() => setCurrentView('favorites')}
              >
                ❤️ Favorites ({favorites.length})
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recipe Search Section */}
      {currentView === 'recipes' && (
        <div className="container">
          <div className="recipe-search">
            <RecipeSearch 
              veganIngredients={veganIngredientList}
              selectedIngredients={selectedIngredients}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              loading={loading}
              setLoading={setLoading}
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isRecipeFavorite={isRecipeFavorite}
            />
          </div>
        </div>
      )}
      
      {/* Ingredients List Section */}
      {currentView === 'ingredients' && (
        <div className="container">
          <div className="ingredients-grid">
            <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
              🥬 Complete Vegan Ingredients Guide
            </h3>
            <p className="text-center mb-4" style={{ color: 'var(--vegan-dark)', opacity: 0.8 }}>
              Explore {veganIngredientList.length} plant-based ingredients for your vegan journey
            </p>
            
            {/* Selected Ingredients Display */}
            {selectedIngredients.length > 0 && (
              <div className="selected-ingredients-section mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 style={{ color: 'var(--vegan-primary)' }}>
                    🌟 Selected Ingredients ({selectedIngredients.length})
                  </h5>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-vegan btn-sm"
                      onClick={() => setCurrentView('recipes')}
                    >
                      🔍 Find Recipes
                    </button>
                    <button 
                      className="btn btn-vegan-outline btn-sm"
                      onClick={clearSelectedIngredients}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                <div className="selected-ingredients-list d-flex flex-wrap gap-2 mb-3">
                  {selectedIngredients.map(ingredient => (
                    <span 
                      key={ingredient.id} 
                      className="badge bg-success d-flex align-items-center gap-1"
                      style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
                    >
                      {ingredient.name}
                      <button 
                        className="btn-close btn-close-white"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleIngredientSelect(ingredient)}
                        aria-label="Remove ingredient"
                      ></button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="row g-0"> {/* Remove Bootstrap's default gutters */}
              {veganIngredientList.map(ingredient => (
                <div key={ingredient.id} className="col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
                  <IngredientCard 
                    ingredient={ingredient}
                    isSelected={isIngredientSelected(ingredient)}
                    onSelect={handleIngredientSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Favorites Section */}
      {currentView === 'favorites' && (
        <div className="container">
          <div className="favorites-section">
            <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
              ❤️ Your Favorite Vegan Recipes
            </h3>
            {favorites.length === 0 ? (
              <div className="text-center mt-5 p-5" style={{ 
                backgroundColor: 'var(--vegan-light)', 
                borderRadius: '20px',
                border: '2px dashed var(--vegan-accent)'
              }}>
                <h5 style={{ color: 'var(--vegan-primary)' }}>No favorites yet!</h5>
                <p style={{ color: 'var(--vegan-dark)', opacity: 0.8 }}>
                  🔍 Search for recipes and click the heart icon to save your favorites
                </p>
                <button 
                  className="btn btn-vegan mt-3"
                  onClick={() => setCurrentView('recipes')}
                >
                  🌱 Start Searching Recipes
                </button>
              </div>
            ) : (
              <div className="row">
                {favorites.map(recipe => (
                  <div key={recipe.id} className="col-md-4 mb-4">
                    <div className="card h-100" style={{ 
                      borderRadius: '15px', 
                      border: '2px solid var(--vegan-accent)',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}>
                      <div className="position-relative">
                        <img 
                          src={recipe.image} 
                          className="card-img-top" 
                          alt={recipe.title}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <button
                          className="btn btn-danger position-absolute"
                          style={{ top: '10px', right: '10px', borderRadius: '50%', width: '40px', height: '40px' }}
                          onClick={() => removeFromFavorites(recipe.id)}
                          title="Remove from favorites"
                        >
                          💔
                        </button>
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title" style={{ color: 'var(--vegan-primary)' }}>
                          {recipe.title}
                        </h5>
                        <div className="mt-auto">
                          <small className="text-muted">
                            🕒 Ready in {recipe.readyInMinutes || 'N/A'} minutes
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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

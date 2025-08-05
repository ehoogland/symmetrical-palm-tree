import React, { useState } from 'react';
import { recipeService } from '../services/recipeService';

const RecipeSearch = ({ veganIngredients }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim() && selectedIngredients.length === 0) {
      setError('Please enter a search term or select ingredients');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let results;
      if (selectedIngredients.length > 0) {
        results = await recipeService.findRecipesByIngredients(selectedIngredients);
      } else {
        results = await recipeService.searchVeganRecipes(searchQuery);
      }
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please check your API key and try again.');
      console.error('Recipe search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleIngredient = (ingredientName) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
    setSearchQuery('');
    setRecipes([]);
    setError('');
  };

  return (
    <div>
      <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
        🍽️ Find Vegan Recipes
      </h3>
      
      {/* Search Input */}
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control form-control-vegan"
            placeholder="🔍 Search for recipes (e.g., 'pasta', 'curry', 'salad')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="col-md-4 d-flex align-items-start gap-2">
          <button 
            className="btn btn-vegan" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : (
              <>
                <span className="emoji-highlight">🌱</span> Search Recipes
              </>
            )}
          </button>
          <button 
            className="btn btn-vegan-outline" 
            onClick={clearSelection}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Ingredient Selection */}
      <div className="mb-4">
        <h5 style={{ color: 'var(--vegan-primary)' }}>
          🥕 Or select ingredients from your list:
        </h5>
        <div className="row">
          {veganIngredients.slice(0, 20).map(ingredient => (
            <div key={ingredient.id} className="col-md-3 col-sm-4 mb-2">
              <button
                className={`btn btn-sm w-100 ${
                  selectedIngredients.includes(ingredient.name)
                    ? 'btn-vegan'
                    : 'btn-vegan-outline'
                }`}
                onClick={() => toggleIngredient(ingredient.name)}
              >
                {selectedIngredients.includes(ingredient.name) ? '✅' : '🌿'} {ingredient.name}
              </button>
            </div>
          ))}
        </div>
        {selectedIngredients.length > 0 && (
          <div className="mt-2 p-3" style={{ 
            backgroundColor: 'var(--vegan-light)', 
            borderRadius: '10px',
            border: '1px solid var(--vegan-accent)'
          }}>
            <strong style={{ color: 'var(--vegan-primary)' }}>Selected:</strong> {selectedIngredients.join(', ')}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Recipe Results */}
      {recipes.length > 0 && (
        <div>
          <h4 style={{ color: 'var(--vegan-primary)' }}>
            🎉 Found {recipes.length} Delicious Vegan Recipes
          </h4>
          <div className="row">
            {recipes.map(recipe => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <div className="card h-100" style={{ 
                  borderRadius: '15px', 
                  border: '2px solid var(--vegan-accent)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  {recipe.image && (
                    <img 
                      src={recipe.image} 
                      className="card-img-top" 
                      alt={recipe.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title" style={{ color: 'var(--vegan-primary)' }}>
                      🍽️ {recipe.title}
                    </h5>
                    {recipe.summary && (
                      <p className="card-text flex-grow-1" 
                         style={{ color: 'var(--vegan-dark)', fontSize: '0.9rem' }}
                         dangerouslySetInnerHTML={{ 
                           __html: recipe.summary.substring(0, 150) + '...' 
                         }}>
                      </p>
                    )}
                    <div className="mt-auto">
                      {recipe.readyInMinutes && (
                        <small style={{ color: 'var(--vegan-earth)' }}>
                          ⏱️ Ready in {recipe.readyInMinutes} minutes
                        </small>
                      )}
                      <br />
                      <a 
                        href={recipe.sourceUrl || recipe.spoonacularSourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-vegan btn-sm mt-2"
                      >
                        🌱 View Recipe
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && recipes.length === 0 && (searchQuery || selectedIngredients.length > 0) && !error && (
        <div className="text-center mt-4 p-4" style={{ 
          backgroundColor: 'var(--vegan-light)', 
          borderRadius: '15px',
          border: '1px solid var(--vegan-accent)'
        }}>
          <p style={{ color: 'var(--vegan-primary)', fontSize: '1.1rem' }}>
            🔍 No recipes found. Try different search terms or ingredients.
          </p>
          <small style={{ color: 'var(--vegan-earth)' }}>
            💡 Tip: Try broader terms like "pasta", "salad", or "curry"
          </small>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;

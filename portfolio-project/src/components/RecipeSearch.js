import { useState, useEffect } from 'react';
import IngredientCard from '../IngredientCard';
import { recipeService } from '../services/recipeService';
import { Link } from 'react-router-dom';

const RecipeSearch = ({ 
  veganIngredients, 
  selectedIngredients, 
  searchResults, 
  setSearchResults, 
  loading, 
  setLoading,
  favorites,
  addToFavorites,
  removeFromFavorites,
  isRecipeFavorite,
  useMockData
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localSelectedIngredients, setLocalSelectedIngredients] = useState([]);
  const [error, setError] = useState('');

  /**
   * useEffect is used here to auto-populate the search query whenever selectedIngredients changes.
   * This ensures the search bar always reflects the user's current ingredient selection from the parent (App).
   * It's reactive, so if the user adds/removes ingredients, the search input updates automatically.
   * This pattern is preferred over manual syncing because it keeps UI and state consistent and reduces bugs.
   * This is the idiomatic React way to synchronize derived state with props.
   * Derived state means a piece of state in your component that is calculated or generated from props or other state,
   * rather than being set directly by user actions. In this case, the search query is derived from selectedIngredients.
  *
  * Why is this better than useState?
  * - Single Source of Truth: The search query is always based on selectedIngredients, so you avoid having two 
  *   pieces of state that could get out of sync.
  * - Automatic Updates: Any change to selectedIngredients immediately updates the search query, ensuring the UI 
  *   reflects the latest selection without manual intervention.
  * - Less Bug-Prone: You don’t need to remember to update the search query every time selectedIngredients changes; 
  *   React handles it for you.
  * - Idiomatic React: Derived state should be calculated from props or other state, not stored separately. 
  *   This pattern is recommended in React documentation. By derived state, I mean state that is computed 
  *   from other state or props as opposed to being set directly by the user.
  *
  *   In summary, useEffect keeps a UI consistent and reduces the risk of bugs from multiple sources of truth, 
  *   while useState would require manual syncing and could lead to inconsistencies.
  */

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      const ingredientNames = selectedIngredients
        .map(ing => {
          if (ing && ing.name) {
            return ing.name.split(' | ')[0];
          }
          return '';
        })
        .filter(name => name.trim() !== '')
        .join(', ');
      setSearchQuery(ingredientNames);
    } else if (localSelectedIngredients.length > 0) {
      const ingredientNames = localSelectedIngredients
        .map(name => name.split(' | ')[0])
        .filter(name => name.trim() !== '')
        .join(', ');
      setSearchQuery(ingredientNames);
    }
  }, [selectedIngredients, localSelectedIngredients]);

  const handleSearch = async () => {
    // Combine all selected ingredient names (global + local)
    const allSelected = [
      ...selectedIngredients.map(ing => ing.name),
      ...localSelectedIngredients
    ].filter((v, i, arr) => v && arr.indexOf(v) === i); // Remove duplicates

    if (!searchQuery.trim() && allSelected.length === 0) {
      setError('Please enter a search term or select ingredients');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let results;
      // Dynamically import mock service if needed
      const { mockRecipeService } = useMockData ? await import('../services/mockRecipeService') : {};
      if (allSelected.length > 0) {
        // Use ingredients-based search
        const ingredientNames = allSelected.map(name => name.split(' | ')[0]).filter(name => name.trim() !== '');
        console.log('🔍 Searching with ingredient names:', ingredientNames);
        if (useMockData) {
          results = await mockRecipeService.findRecipesByIngredients(ingredientNames);
        } else {
          results = await recipeService.findRecipesByIngredients(ingredientNames);
        }
      } else if (searchQuery.trim()) {
        if (useMockData) {
          results = await mockRecipeService.searchVeganRecipes(searchQuery);
        } else {
          results = await recipeService.searchVeganRecipes(searchQuery);
        }
      }
      setSearchResults(results || []);
    } catch (err) {
      setError('Failed to fetch recipes. Please check your API key and try again.');
      console.error('Recipe search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleIngredient = (ingredientName) => {
    // Check if this ingredient is globally selected
    const isGloballySelected = selectedIngredients.some(sel => sel.name === ingredientName);
    
    if (isGloballySelected) {
      // Can't toggle globally selected ingredients - they need to be deselected from main page
      setError('This ingredient was selected from the main page. Go to the Ingredients tab to deselect it.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }
    
    // Toggle local selection
    setLocalSelectedIngredients(prev => {
      const newSelection = prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName];
      
      // Auto-search when ingredients change
      setTimeout(() => {
        if (newSelection.length > 0 || selectedIngredients.length > 0) {
          handleSearch();
        }
      }, 100);
      
      return newSelection;
    });
  };

  const clearSelection = () => {
    setLocalSelectedIngredients([]);
    setSearchQuery('');
    setSearchResults([]);
    setError('');
  };

  return (
    <div>
  <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
        🍽️ Find Vegan Recipes
      </h3>
      
      {/* Special Search Button for Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="text-center mb-4">
          <button 
            className="btn btn-vegan btn-lg px-4 py-3"
            onClick={handleSearch}
            disabled={loading}
            style={{ 
              fontSize: '1.2rem',
              boxShadow: '0 6px 20px rgba(127, 176, 105, 0.4)',
              border: '3px solid var(--vegan-secondary)'
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Searching...
              </>
            ) : (
              <>
                <span className="emoji-highlight">🍽️</span> 
                Find Recipes with {selectedIngredients.length} Selected Ingredient{selectedIngredients.length > 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      )}

  {/* Search Input */}
  <div className="row mb-3 gx-4 recipe-search-row">
        <div className="col-md-8">
          <label htmlFor="recipe-search-input" className="visually-hidden">Search recipes</label>
          <input
            id="recipe-search-input"
            name="recipeSearch"
            type="text"
            className="form-control form-control-vegan"
            placeholder={selectedIngredients.length > 0 ? "✨ Your selected ingredients (edit if needed)" : "🔍 Search for recipes (e.g., 'pasta', 'curry', 'salad')"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
  <div className="col-md-4 d-flex align-items-start gap-2 search-actions">
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

      {/* Selected Ingredients Display */}
      {(localSelectedIngredients.length > 0 || selectedIngredients.length > 0) && searchResults.length === 0 && (
        <div className="mb-4 p-3" style={{ 
          backgroundColor: 'var(--vegan-light)', 
          borderRadius: '10px',
          border: '1px solid var(--vegan-accent)'
        }}>
          <strong style={{ color: 'var(--vegan-primary)' }}>
            Selected Ingredients: 
          </strong> 
          <div className="row mt-2">
            {selectedIngredients.map(ingredient => (
              <div key={ingredient.id} className="col-md-3 col-sm-4 mb-2">
                <IngredientCard ingredient={ingredient} isSelected={true} />
              </div>
            ))}
            {localSelectedIngredients
              .map(name => veganIngredients.find(ing => ing.name === name))
              .filter(Boolean)
              .map(ingredient => (
                <div key={ingredient.id} className="col-md-3 col-sm-4 mb-2">
                  <IngredientCard ingredient={ingredient} isSelected={true} />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Ingredient Selection - Always show, with global selections checked */}
      {searchResults.length === 0 && (
        <div className="mb-4">
          <h5 style={{ color: 'var(--vegan-primary)' }}>
            🥕 Select ingredients to include in your search:
          </h5>
          <div className="row">
            {veganIngredients.map(ingredient => {
              const isGloballySelected = selectedIngredients.some(sel => sel && sel.name && sel.name === ingredient.name);
              const isLocallySelected = localSelectedIngredients.includes(ingredient.name);
              const isSelected = isGloballySelected || isLocallySelected;
              return (
                <div key={ingredient.id} className="col-md-3 col-sm-4 mb-2">
                  <button
                    className={`btn btn-sm w-100 ${
                      isSelected
                        ? 'btn-vegan'
                        : 'btn-vegan-outline'
                    }`}
                    onClick={() => toggleIngredient(ingredient.name)}
                    style={{ position: 'relative' }}
                  >
                    {isSelected ? '✅' : '🌿'} {ingredient.name ? ingredient.name.split(' | ')[0] : 'Unknown'}
                    {isGloballySelected && (
                      <span style={{ 
                        position: 'absolute',
                        top: '-2px',
                        right: '2px',
                        fontSize: '10px',
                        color: '#FFD700'
                      }}>
                        ⭐
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Recipe Results */}
      {searchResults.length > 0 && (
        <div>
          <h4 style={{ color: 'var(--vegan-primary)' }}>
            🎉 Found {searchResults.length} Delicious Vegan Recipes
          </h4>
          <div className="mb-3 p-2" style={{ 
            backgroundColor: 'var(--vegan-light)', 
            borderRadius: '10px',
            border: '1px solid var(--vegan-accent)',
            fontSize: '0.9rem'
          }}>
            <div style={{ color: 'var(--vegan-primary)' }}>
              ✅ <strong>Strictly Filtered:</strong> All recipes have been filtered to exclude meat, seafood, dairy, eggs, and other animal products
            </div>
            <div style={{ color: 'var(--vegan-dark)', marginTop: '5px' }}>
              🤍 <strong>Save Favorites:</strong> Click the heart button in the top-right corner of any recipe card to save it to your favorites
            </div>
          </div>
          <div className="row">
            {searchResults.map(recipe => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card h-100" style={{ 
                    borderRadius: '15px', 
                    border: '2px solid var(--vegan-accent)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="position-relative">
                      {recipe.image && (
                        <img 
                          src={recipe.image} 
                          className="card-img-top" 
                          alt={recipe.title}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      )}
                    </div>
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
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <button
                            className={`btn ${isRecipeFavorite(recipe.id) ? 'heart-button-selected' : 'heart-button-default'}`}
                            style={{ 
                              borderRadius: '25px',
                              fontSize: '20px',
                              padding: '8px 16px',
                              minWidth: '60px',
                              fontWeight: 'bold',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                              transition: 'all 0.3s ease',
                              border: 'none'
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (isRecipeFavorite(recipe.id)) {
                                removeFromFavorites(recipe.id);
                              } else {
                                addToFavorites(recipe);
                              }
                            }}
                            title={isRecipeFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {isRecipeFavorite(recipe.id) ? '❤️' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && searchResults.length === 0 && (searchQuery || selectedIngredients.length > 0 || localSelectedIngredients.length > 0) && !error && (
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

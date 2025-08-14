import React, { useState, useEffect } from 'react';
import { recipeService } from '../services/recipeService';

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
  isRecipeFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localSelectedIngredients, setLocalSelectedIngredients] = useState([]);
  const [error, setError] = useState('');

  // Auto-populate search query when ingredients are selected from parent
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
    }
  }, [selectedIngredients]);

  const handleSearch = async () => {
    const ingredientsToUse = selectedIngredients.length > 0 ? selectedIngredients : localSelectedIngredients;
    
    if (!searchQuery.trim() && ingredientsToUse.length === 0) {
      setError('Please enter a search term or select ingredients');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let results;
      if (ingredientsToUse.length > 0) {
        // Use ingredients-based search
        const ingredientNames = ingredientsToUse.map(ing => {
          // Handle both string ingredients and object ingredients
          if (typeof ing === 'string') {
            return ing.split(' | ')[0];
          } else if (ing && ing.name) {
            return ing.name.split(' | ')[0];
          } else {
            console.warn('Invalid ingredient format:', ing);
            return '';
          }
        }).filter(name => name.trim() !== ''); // Filter out empty names
        
        console.log('🔍 Searching with ingredient names:', ingredientNames);
        results = await recipeService.findRecipesByIngredients(ingredientNames);
      } else if (searchQuery.trim()) {
        // Use text-based search
        results = await recipeService.searchVeganRecipes(searchQuery);
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
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control form-control-vegan"
            placeholder={selectedIngredients.length > 0 ? "✨ Your selected ingredients (edit if needed)" : "🔍 Search for recipes (e.g., 'pasta', 'curry', 'salad')"}
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

      {/* Selected Ingredients Display */}
      {(localSelectedIngredients.length > 0 || selectedIngredients.length > 0) && (
        <div className="mb-4 p-3" style={{ 
          backgroundColor: 'var(--vegan-light)', 
          borderRadius: '10px',
          border: '1px solid var(--vegan-accent)'
        }}>
          <strong style={{ color: 'var(--vegan-primary)' }}>
            Selected Ingredients: 
          </strong> 
          <br />
          <span style={{ fontSize: '0.9rem' }}>
            {[
              ...selectedIngredients
                .map(ing => ing && ing.name ? `${ing.name.split(' | ')[0]} ⭐` : '')
                .filter(name => name !== ''), 
              ...localSelectedIngredients
            ].join(', ')}
          </span>
        </div>
      )}

      {/* Ingredient Selection - Always show, with global selections checked */}
      <div className="mb-4">
        <h5 style={{ color: 'var(--vegan-primary)' }}>
          🥕 Select ingredients to include in your search:
        </h5>
        <div className="row">
          {veganIngredients.slice(0, 20).map(ingredient => {
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
                          className="btn btn-vegan btn-sm"
                          onClick={async () => {
                            if (recipe.sourceUrl || recipe.spoonacularSourceUrl) {
                              // If we have a direct URL, open it
                              window.open(recipe.sourceUrl || recipe.spoonacularSourceUrl, '_blank');
                            } else {
                              // Fetch full recipe details to get the source URL
                              try {
                                const fullRecipe = await recipeService.getRecipeDetails(recipe.id);
                                if (fullRecipe.sourceUrl || fullRecipe.spoonacularSourceUrl) {
                                  window.open(fullRecipe.sourceUrl || fullRecipe.spoonacularSourceUrl, '_blank');
                                } else {
                                  // Fallback: open Spoonacular page
                                  window.open(`https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}`, '_blank');
                                }
                              } catch (error) {
                                console.error('Error fetching recipe details:', error);
                                // Fallback: show recipe info
                                alert(`Recipe: ${recipe.title}\n\nSorry, we couldn't find the original recipe source. You can search for "${recipe.title}" on your favorite recipe website.`);
                              }
                            }
                          }}
                        >
                          🌱 View Recipe
                        </button>
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

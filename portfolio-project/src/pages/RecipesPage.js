import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeSearch from '../components/RecipeSearch';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';

export default function RecipesPage() {
  const veganIngredients = useSelector(state => state.ingredients.veganList || []);
  const selectedIngredients = useSelector(state => state.ingredients.selected || []);
  const searchResults = useSelector(state => state.search.results || []);
  const loading = useSelector(state => state.search.loading || false);
  const favorites = useSelector(state => state.favorites.list || []);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="recipe-search">
        <RecipeSearch
          veganIngredients={veganIngredients}
          selectedIngredients={selectedIngredients}
          searchResults={searchResults}
          setSearchResults={(r) => dispatch({ type: 'search/setResults', payload: r })}
          loading={loading}
          setLoading={(v) => dispatch({ type: 'search/setLoading', payload: v })}
          favorites={favorites}
          addToFavorites={(recipe) => dispatch(addFavorite(recipe))}
          removeFromFavorites={(id) => dispatch(removeFavorite(id))}
          isRecipeFavorite={(id) => favorites && favorites.some(f => String(f.id) === String(id) || String(f.spoonacularId || '') === String(id))}

        />
      </div>
    </div>
  );
}

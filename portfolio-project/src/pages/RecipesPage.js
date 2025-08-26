import React, { useContext } from 'react';
import { AppContext } from '../App';
import RecipeSearch from '../components/RecipeSearch';

export default function RecipesPage() {
  const ctx = useContext(AppContext);
  return (
    <div className="container">
      <div className="recipe-search">
        <RecipeSearch
          veganIngredients={ctx.veganIngredientList}
          selectedIngredients={ctx.selectedIngredients}
          searchResults={ctx.searchResults}
          setSearchResults={ctx.setSearchResults}
          loading={ctx.loading}
          setLoading={ctx.setLoading}
          favorites={ctx.favorites}
          addToFavorites={ctx.addToFavorites}
          removeFromFavorites={ctx.removeFromFavorites}
          isRecipeFavorite={ctx.isRecipeFavorite}
          useMockData={ctx.useMockData}
        />
      </div>
    </div>
  );
}

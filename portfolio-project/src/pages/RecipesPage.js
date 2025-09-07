import React from 'react';
/** @typedef {import('../types').RecipeSummary} RecipeSummary */
/** @typedef {import('../types').Ingredient} Ingredient */
import { useSelector, useDispatch } from 'react-redux';
import RecipeSearch from '../components/RecipeSearch';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';

/**
 * @component RecipesPage component
 * @description This component renders the recipe search page, allowing users to search for vegan recipes
 * based on selected ingredients. It connects to the Redux store to access the list of vegan ingredients,
 * selected ingredients, search results, loading state, and favorites. It also dispatches actions to update
 * the search results and manage favorites.
 * @action {function} Redux action creators for updating search results and managing favorites
 * An action creator is a function that returns an action object, which is dispatched to the Redux 
 * store to update the state. Dispatched actions include:
 * `addFavorite()`
 * `removeFavorite()`
 * `setSearchResults()`
 * `setLoading()`
 * `setError()`
 * `clearFavorites()`
 * `clearSearchResults()`
 * `clearLoading()`
 * `clearError()`
 *  @note about Dispatch in Redux:
 *  Dispatch in Redux refers to the process, as expressed in a function, of sending an action to the Redux store.
 *  It is also the function used to send actions to the Redux store. The Redux store then processes these actions
 *  and updates the state accordingly. Dispatching actions is a core concept in Redux, as it allows for state
 *  changes in response to user interactions or other events in the application.
 *
 * @dispatch {function} The useDispatch hook from react-redux, which provides the dispatch function to send actions to the Redux store.
 * @selector {function} The useSelector hook from react-redux, which allows access to specific parts of the Redux state.
 * @state {object} The Redux state accessed via useSelector, including veganIngredients, selectedIngredients, searchResults, loading, and favorites.
 * @type {JSX.Element} The return type of the component, which is a React element representing the UI.
 * In this case, it returns a container div with a RecipeSearch component inside.
 * @payload {JSX.Element} The rendered component
 * @returns {JSX.Element}
 */
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

import React, { useEffect, useState } from 'react';
/** @typedef {import('../types').RecipeDetails} RecipeDetails */
import { useParams } from 'react-router-dom';
import { recipeService } from '../services';

/**
 * RecipeDetails
 *
 * React component responsible for loading and rendering a single recipe's details.
 *
 * Behavior:
 * - Reads the recipe `id` from the route params via `useParams()`.
 * @useParams
 * - Uses an AbortController (implementation details follow) to cancel in-flight fetches when the
 *   component unmounts. This prevents setting state on an unmounted component, which can lead to
 *   memory leaks and warnings.
 *   @useRef
 * - useRef returns a stable, mutable object with a .current property that persists across renders
 *   and can hold a DOM node or any mutable value without causing re-renders. This is ideal for
 *   storing the AbortController instance. A DOM (Document Object Model) node refers to any object
 *   in the HTML document structure, such as elements, attributes, and text. A mutable value is
 *   any value that can be changed after it is created, such as objects or arrays.
 *
 * Implementation notes:
 * - Uses `recipeService.getRecipeDetails(id, { signal })` to fetch recipe details. signal is
 *   the AbortSignal from the AbortController. This allows the fetch to be cancelled if needed.
 *  - The service method throws on HTTP errors or network failures. A service method is a function
 *   that performs a specific operation related to a service, such as fetching data from an API.
 *   Service methods are typically defined in a separate module or file and can be reused across
 *   different components or parts of the application. If aborted, fetch rejects with AbortError.
 *  - Handles loading and error states with local state variables. 
 * - Tracks the last search's AbortController for cancellation. AbortControllers are
 *   a web API that allows you to abort one or more DOM requests as and when desired. 
 *   This is useful for cancelling fetch requests. A DOM (Document Object Model) request refers to
 *   operations that interact with the structure of a web page, such as fetching data from a server
 *
 * @useState
 * - Manages local state for the recipe details, loading status, and error messages.
 * - Fetches recipe details from the service and handles loading and error states.
 * - Renders loading, error, or "no recipe" states as appropriate.
 * @useEffect
 * This effect fetches the recipe details when the component mounts or when the ID changes.
 * It also sets up an AbortController to cancel [in-flight] fetches if the component unmounts
 *
 * There are no props; the component reads the id from the URL.
 *
 *
 * @returns {JSX.Element}
 */
function RecipeDetails() {

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /** 
   * Fetch recipe details by ID
   * This effect runs on component mount and when the ID changes.
   * It fetches the recipe details from the service and handles loading and error states.
   * setRecipe, setLoading, setError are setters returned by React hooks in the same component
   * (e.g. const [recipe, setRecipe] = useState(...)). React guarantees those setter functions are
   * stable (their identity never changes), so you do not need to include them in the effect dependency array.
   * @param {string} id - The ID of the recipe to fetch. This comes from the URL params via useParams().
   * It is included in the effect dependency array so the effect re-runs if the ID changes.
   * @throws {Error} On HTTP errors or network failures. If aborted, fetch rejects with AbortError.
   * @returns {void}
   */
  useEffect(() => {

    const controller = new AbortController();

    async function fetchRecipe() {
      setRecipe(null);
      setLoading(true);
      setError('');
      try {
        const data = await recipeService.getRecipeDetails(id, { signal: controller.signal });
        setRecipe(data);
      } catch (err) {
        if (err.name === 'AbortError') return; // request was cancelled
        setError('Failed to load recipe details.');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchRecipe();
    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p className="text-danger">{error}</p></div>;
  if (!recipe) return <div className="container"><p>No recipe found.</p></div>;

  return (
    <div className="container">
      <h2 style={{ color: 'var(--vegan-primary)' }}>{recipe.title}</h2>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', borderRadius: '15px', marginBottom: '1rem' }} />
      )}
      {recipe.summary && (
        <div style={{ color: 'var(--vegan-dark)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      )}
      {recipe.extendedIngredients && (
        <div style={{ marginBottom: '1rem' }}>
          <h4>Ingredients</h4>
          <ul>
            {recipe.extendedIngredients.map(ing => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        </div>
      )}
      {recipe.instructions && (
        <div>
          <h4>Instructions</h4>
          <div style={{ color: 'var(--vegan-dark)' }} dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
      )}
      {!recipe.instructions && recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
        <div>
          <h4>Instructions</h4>
          <ol>
            {recipe.analyzedInstructions[0].steps.map((step, idx) => (
              <li key={idx}>{step.step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;


/**
 * Spoonacular API service
 * Note that the key is loaded from environment variables and should be kept secret
 * .gitignore filters out .env files so they are not included in version control
 *
 * Exposes helper methods that return Promises for common recipe operations:
 * - searchVeganRecipes(query, includeIngredients, number)
 * - getRecipeDetails(recipeId, options)
 * - findRecipesByIngredients(ingredients, number)
 *
 * Notes:
 * - getRecipeDetails accepts an optional `options` object with a `signal` (AbortSignal)
 *   so callers may cancel in-flight fetch requests using AbortController.
 */

/**
 * @typedef {Object} RecipeSummary
 * @property {number} id
 * @property {string} title
 * @property {string} [image]
 * @property {string} [summary]
 */

/**
 * @typedef {Object} RecipeDetails
 * @property {number} id
 * @property {string} title
 * @property {string} [image]
 * @property {string} [summary]
 * @property {Array<Object>} [extendedIngredients]
 * @property {string} [instructions]
 * @property {Array<Object>} [analyzedInstructions]
 */
// Using live Spoonacular API; mock service removed
const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Debug: Check if API key is loaded
console.log('API Key loaded:', SPOONACULAR_API_KEY ? 'Yes' : 'No');
if (!SPOONACULAR_API_KEY) {
  console.error('REACT_APP_SPOONACULAR_API_KEY not found in environment variables');
}

// Function to check if a recipe contains non-vegan ingredients
// The isVeganRecipe function checks if a recipe is vegan by looking for non-vegan 
// terms in its title and summary.
// Notice the use of optional chaining (?.) and nullish coalescing (||) operators
// This prevents your code from crashing if recipe.title is missing

const isVeganRecipe = (recipe) => {
  // Original code:
  // const title = recipe.title?.toLowerCase() || '';
  // const summary = recipe.summary?.toLowerCase() || '';
  // Swapped to nullish coalescing (??) to avoid treating '', 0, or false as fallback:
  const title = recipe.title?.toLowerCase() ?? '';
  const summary = recipe.summary?.toLowerCase() ?? '';
  const textToCheck = `${title} ${summary}`;

  // The checkbox (✅) and red diagonal slash in a circle (🚫) 
  // app are Unicode emoji characters, not custom icons or images.
  // ✅ is the "white heavy check mark" emoji (U+2705)
  // 🚫 is the "no entry" emoji (U+1F6AB)
  
  // Simplified filtering - only the most obvious non-vegan terms
  // More comprehensive filtering was too exclusive
  // TODO: Use regex for more flexible matching or the 
  const nonVeganTerms = [
    'bacon', 'ham', 'beef', 'pork', 'chicken', 'turkey', 'fish', 'salmon', 
    'shrimp', 'crab', 'lobster', 'cheese', 'butter', 'cream cheese', 'egg'
  ];
  
  // --- Possible future refactor using match syntax (when widely supported) ---
  // ECMAScript proposal: match statement
  /*
    const foundNonVegan = nonVeganTerms.find(term => textToCheck.includes(term));
    match (foundNonVegan) {
      when (undefined) => {
        console.log(`✅ Keeping: "${recipe.title}"`);
        return true;
      }
      when (term) => {
        console.log(`🚫 Filtered out: "${recipe.title}" - Contains: ${term}`);
        return false;
      }
    }
  */
  const foundNonVegan = nonVeganTerms.find(term => textToCheck.includes(term));
  
  if (foundNonVegan) {
    console.log(`🚫 Filtered out: "${recipe.title}" - Contains: ${foundNonVegan}`);
    return false;
  } else {
    console.log(`✅ Keeping: "${recipe.title}"`);
    return true;
  }
};

export const recipeService = {
  /**
   * Search for vegan recipes using Spoonacular's complexSearch endpoint.
   * Filters results to obvious non-vegan terms and returns up to `number` items.
   *
   * @param {string} [query=''] - User-facing search string
   * @param {string} [includeIngredients=''] - Comma-separated ingredients to include
   * @param {number} [number=12] - Maximum number of results to return (post-filter)
   * @returns {Promise<Object[]>} Array of recipe result objects
   * @throws {Error} On HTTP/network errors or when API limits are reached
   */
  searchVeganRecipes: async (query = '', includeIngredients = '', number = 12) => {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      diet: 'vegan',    
      intolerances: 'dairy,egg,seafood',
      query,
      includeIngredients,
      number: number * 2,
      addRecipeInformation: true,
      fillIngredients: true   
    });

    try {
      const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
      if (!response.ok) {
        if (response.status === 401) {
          console.error('🔑 API Key Error (401)');
          throw new Error(`API Key unauthorized (401). Check your Spoonacular API key.`);
        }
        if (response.status === 402) {
          console.warn('💳 API Limit Reached (402) - No mock available; throwing');
          throw new Error('API limit reached (402)');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const filteredResults = data.results.filter(isVeganRecipe);
      return filteredResults.slice(0, number);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('402')) {
        console.warn('🌐 Network/Limit Error - No mock available; rethrowing');
        throw error;
      }
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  /**
   * Get recipe details by ID.
   * Accepts an optional options object with an AbortSignal so callers may cancel the request.
   *
   * @param {number|string} recipeId - Spoonacular recipe ID
   * @param {{signal?: AbortSignal}} [options] - Optional settings (supports AbortSignal)
   * @returns {Promise<Object>} The recipe details JSON
   * @throws {Error} On HTTP errors or network failures. If aborted, fetch rejects with AbortError.
   */
  getRecipeDetails: async (recipeId, options = {}) => {
    // Accept an optional options object with a Fetch AbortSignal so callers can cancel requests.
    const { signal } = options;
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      includeNutrition: false
    });

    try {
      const response = await fetch(`${BASE_URL}/${recipeId}/information?${params}`, { signal });
      if (!response.ok) {
        if (response.status === 402) {
          console.warn('💳 API Limit Reached (402) - No mock available; throwing');
          throw new Error('API limit reached (402)');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('402')) {
        console.warn('🌐 Network/Limit Error - No mock available; rethrowing');
        throw error;
      }
      console.error('Error fetching recipe details:', error);
      throw error;
    }
  },

  /**
   * Find recipes that match the provided ingredient list.
   * Attempts a vegan-focused complexSearch first and falls back to
   * findByIngredients. Results are filtered for obvious non-vegan terms.
   *
   * @param {string[]} ingredients - Array of ingredient names
   * @param {number} [number=12] - Max results to return
   * @returns {Promise<Object[]>} Array of recipe summaries
   * @throws {Error} On network/HTTP errors or when API limits are reached
   */
  findRecipesByIngredients: async (ingredients, number = 12) => {
    const ingredientString = ingredients.join(',');
    try {
      // Try vegan search first
      const veganParams = new URLSearchParams({
        apiKey: SPOONACULAR_API_KEY,
        diet: 'vegan',
        includeIngredients: ingredientString,
        number: number,
        addRecipeInformation: true,
        fillIngredients: true
      });
      const veganUrl = `${BASE_URL}/complexSearch?${veganParams}`;
      const veganResponse = await fetch(veganUrl);
      if (veganResponse.status === 402) {
        console.warn('💳 API Limit Reached (402) - No mock available; trying fallback search');
        // proceed to fallback ingredient-based search below
      }
      if (veganResponse.ok) {
        const veganData = await veganResponse.json();
        if (veganData.results && veganData.results.length > 0) {
          return veganData.results;
        }
      }
      // Fallback to ingredient search
      const params = new URLSearchParams({
        apiKey: SPOONACULAR_API_KEY,
        ingredients: ingredientString,
        number: number * 2,
        ranking: 1,
        ignorePantry: true
      });
      const url = `${BASE_URL}/findByIngredients?${params}`;
      const response = await fetch(url);
      if (response.status === 402) {
        console.warn('💳 API Limit Reached (402) - No mock available; throwing');
        throw new Error('API limit reached (402)');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        return [];
      }
      const filteredRecipes = data.filter(isVeganRecipe);
      return filteredRecipes.slice(0, number);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('402')) {
        console.warn('🌐 Network/Limit Error - No mock available; rethrowing');
        throw error;
      }
      console.error('❌ Error finding recipes by ingredients:', error);
      throw error;
    }
  }
};

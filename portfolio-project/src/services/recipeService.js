
// Spoonacular API service

// Note that the key is loaded from environment variables and should be kept secret
// .gitignore filters out .env files so they are not included in version control
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
  // TODO: Use regex for more flexible matching
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
  // Search for vegan recipes
  searchVeganRecipes: async (query = '', includeIngredients = '', number = 12) => {
  const params = new URLSearchParams({
    apiKey: SPOONACULAR_API_KEY,
    diet: 'vegan',
    intolerances: 'dairy,egg,seafood',
    query,
    includeIngredients,
    number: number * 2,
    addRecipeInformation: true
  });
  const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
  if (!response.ok) {
    if (response.status === 401) {
      console.error('🔑 API Key Error (401)');
      throw new Error(`API Key unauthorized (401). Check your Spoonacular API key.`);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const filteredResults = data.results.filter(isVeganRecipe);
  return filteredResults.slice(0, number);
},

  getRecipeDetails: async (recipeId) => {
  const params = new URLSearchParams({
    apiKey: SPOONACULAR_API_KEY,
    includeNutrition: false
  });
  const response = await fetch(`${BASE_URL}/${recipeId}/information?${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
},
  // Find recipes by ingredients
  findRecipesByIngredients: async (ingredients, number = 12) => {
  const ingredientString = ingredients.join(',');
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
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (data.length === 0) {
    return [];
  }
    const filteredRecipes = data.filter(isVeganRecipe);
    return filteredRecipes.slice(0, number);
  }
};

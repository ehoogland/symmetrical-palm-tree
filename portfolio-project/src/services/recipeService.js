// Spoonacular API service
const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Debug: Check if API key is loaded
console.log('API Key loaded:', SPOONACULAR_API_KEY ? 'Yes' : 'No');
console.log('API Key type:', typeof SPOONACULAR_API_KEY);
console.log('API Key value:', SPOONACULAR_API_KEY);
console.log('API Key length:', SPOONACULAR_API_KEY?.length);
if (!SPOONACULAR_API_KEY) {
  console.error('REACT_APP_SPOONACULAR_API_KEY not found in environment variables');
}

export const recipeService = {
  // Search for vegan recipes
  searchVeganRecipes: async (query = '', includeIngredients = '', number = 12) => {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      diet: 'vegan',
      query,
      includeIngredients,
      number,
      addRecipeInformation: true,
      fillIngredients: true
    });

    try {
      const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
      if (!response.ok) {
        if (response.status === 401) {
          console.error('🔑 API Key Error (401):', {
            apiKeyExists: !!SPOONACULAR_API_KEY,
            apiKeyLength: SPOONACULAR_API_KEY?.length,
            apiKeyStart: SPOONACULAR_API_KEY?.substring(0, 8) + '...',
            url: `${BASE_URL}/complexSearch?${params}`
          });
          throw new Error(`API Key unauthorized (401). Check your Spoonacular API key.`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  // Get recipe details including ingredients and instructions
  getRecipeDetails: async (recipeId) => {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      includeNutrition: false
    });

    try {
      const response = await fetch(`${BASE_URL}/${recipeId}/information?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      throw error;
    }
  },

  // Find recipes by ingredients from your vegan list
  findRecipesByIngredients: async (ingredients, number = 12) => {
    const ingredientString = ingredients.join(',');
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      ingredients: ingredientString,
      number,
      ranking: 1, // Maximize used ingredients
      ignorePantry: true
    });

    try {
      const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Filter for vegan recipes
      return data.filter(recipe => 
        !recipe.title.toLowerCase().includes('chicken') &&
        !recipe.title.toLowerCase().includes('beef') &&
        !recipe.title.toLowerCase().includes('pork') &&
        !recipe.title.toLowerCase().includes('fish') &&
        !recipe.title.toLowerCase().includes('cheese') &&
        !recipe.title.toLowerCase().includes('milk') &&
        !recipe.title.toLowerCase().includes('egg')
      );
    } catch (error) {
      console.error('Error finding recipes by ingredients:', error);
      throw error;
    }
  }
};

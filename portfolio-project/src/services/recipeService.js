// Spoonacular API service
import { mockRecipeService } from './mockRecipeService';

const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Debug: Check if API key is loaded
console.log('API Key loaded:', SPOONACULAR_API_KEY ? 'Yes' : 'No');
if (!SPOONACULAR_API_KEY) {
  console.error('REACT_APP_SPOONACULAR_API_KEY not found in environment variables');
}

// Function to check if a recipe contains non-vegan ingredients
const isVeganRecipe = (recipe) => {
  const title = recipe.title?.toLowerCase() || '';
  const summary = recipe.summary?.toLowerCase() || '';
  const textToCheck = `${title} ${summary}`;
  
  // Simplified filtering - only the most obvious non-vegan terms
  const nonVeganTerms = [
    'bacon', 'ham', 'beef', 'pork', 'chicken', 'turkey', 'fish', 'salmon', 
    'shrimp', 'crab', 'lobster', 'cheese', 'butter', 'cream cheese', 'egg'
  ];
  
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
    console.warn('💳 API Limit Reached - Using mock data');
    return await mockRecipeService.searchVeganRecipes(query, includeIngredients, number);
  },

  // Get recipe details
  getRecipeDetails: async (recipeId) => {
    console.warn('💳 API Limit Reached - Using mock data');
    return await mockRecipeService.getRecipeDetails(recipeId);
  },

  // Find recipes by ingredients
  findRecipesByIngredients: async (ingredients, number = 12) => {
    console.warn('💳 API Limit Reached - Using mock data');
    return await mockRecipeService.findRecipesByIngredients(ingredients, number);
  }
};

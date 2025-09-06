// Service selector: export recipeService from real or mock implementation based on env
import { recipeService as realRecipeService } from './recipeService';
import { mockRecipeService } from './mockRecipeService';

const useMock = process.env.REACT_APP_USE_MOCK === 'true';

export const recipeService = useMock ? mockRecipeService : realRecipeService;
export default recipeService;

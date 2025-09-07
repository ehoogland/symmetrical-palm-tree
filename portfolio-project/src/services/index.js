/**
 * Service entrypoint
 *
 * Central export point for runtime services. Right now we export the live
 * `recipeService` implementation (Spoonacular). Tests can mock `recipeService`
 * by targeting this module (e.g. `jest.mock('../services', ...)`) or by
 * importing `recipeService` directly from `./recipe`.
 */
import { recipeService } from './recipe';

export { recipeService };
export default recipeService;

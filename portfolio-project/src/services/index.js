/**
 * Service entrypoint
 *
 * Central export point for runtime services. Right now we export the live
 * `recipeService` implementation (Spoonacular). If you later want to switch
 * implementations for tests or local development, update this module to branch
 * on an environment flag.
 */
import { recipeService } from './recipe';

export { recipeService };
export default recipeService;

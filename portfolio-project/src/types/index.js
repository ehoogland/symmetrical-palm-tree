/**
 * Shared JSDoc typedefs for the project (pure JS, no TypeScript `.d.ts`).
 *
 * Put lightweight shared shapes here so editors (VS Code) can surface completions and simple checks 
 * for JavaScript files that use JSDoc. A shared shape means a common object structure
 * used in multiple places, such as API responses or Redux state slices. Being able to surface completions
 * just means your editor (VS Code/IntelliSense) shows autocomplete suggestions and quick info while you
 * type — e.g., property names, method signatures, parameter hints, and the JSDoc summary for a function or type.
 * Typedefs and shared types help the editor “know” the shape of data so those useful suggestions and hover docs appear.
 * Data types used in typed languages like TypeScript should go in `.d.ts` files. To avoid scope creep I do not use
 * TypeScript in this project. I am using JSDoc typedefs in JS files mainly to enhance auto-completion. It can also help
 * with lightweight type checking.
 */


/**
 * @typedef {Object} Ingredient
 * @property {number|string} id
 * @property {string} name
 * @property {string} [notes]
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

/**
 * @typedef {Object} FavoriteItem
 * @property {number|string} id           - json-server id
 * @property {number|string} spoonacularId - original Spoonacular recipe id
 * @property {Object} [payload]            - full stored recipe payload
 */

/**
 * RootState (approximate shape for editor tooling like VS Code IntelliSense).
 * Approximate shape refers to the overall structure and types of the Redux state.
 * Keep in sync with reducers, which are defined as functions that take the current
 * state and an actionand return a new state based on the action type and payload.
 * Use `/** @typedef {import('../types').RootState} RootState *\/` in files that
 * want to reference the global state shape. The global state shape is the overall structure
 * of the Redux store, which includes all the slices of state managed by different reducers.
 *
 * NOTE: This is an editor-time aid only (JSDoc). It doesn't affect runtime.
 */
/**
 * @typedef {Object} RootState
 * @property {{ veganList: Ingredient[], selected: Ingredient[]}} ingredients
 * @property {{ list: FavoriteItem[] }} favorites
 * @property {{ query: string, results: RecipeSummary[] }} search
 * @property {{ showSubscribe: boolean }} ui
 * @property {{ data: any }} apiData
 */

// Keep this file a module so `import('../types')` resolves in editors
export {};

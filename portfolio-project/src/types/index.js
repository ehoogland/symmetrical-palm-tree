/**
 * Shared JSDoc typedefs for the project (pure JS, no TypeScript `.d.ts`).
 *
 * Put lightweight shared shapes here so editors (VS Code) and the TypeScript
 * language server can surface completions and simple checks for plain
 * JavaScript files that use JSDoc.
 *
 * Example usage (in another JS file):
 *   // See the top of this file for typedef names to import via JSDoc `import()`.
 */

// Example usage (outside JSDoc):
// /** @typedef {import('../types').Ingredient} Ingredient */
// /** @param {Ingredient[]} list */
// function foo(list) { }

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
 * RootState (approximate shape for editor tooling). Keep in sync with reducers.
 * Use `/** @typedef {import('../types').RootState} RootState *\/` in files that
 * want to reference the global state shape.
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

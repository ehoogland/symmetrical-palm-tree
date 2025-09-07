/**
 * Store entrypoint (re-export)
 *
 * The concrete store implementation lives in `./store.js`. This re-export
 * from `index.js` allows existing imports (e.g. `import store from './store'`)
 * to continue to work unchanged.
 */

// Re-export the configured store implementation
export { default } from './store';

/**
 * RootState typedef for editor/JSdoc consumers.
 * @typedef {Object} RootState
 * @property {import('./slices/favoritesSlice').default} favorites
 * @property {import('./slices/ingredientsSlice').default} ingredients
 * @property {import('./slices/searchSlice').default} search
 * @property {import('./slices/uiSlice').default} ui
 * @property {import('./slices/apiDataSlice').default} apiData
 */

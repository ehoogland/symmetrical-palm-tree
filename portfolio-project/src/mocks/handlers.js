import { rest } from 'msw';
import { veganIngredientList } from '../data/veganIngredients';
/**
 * Request handlers for MSW (Mock Service Worker)
 * These handlers simulate a backend API for development and testing.
 * We provide endpoints for:
 * - GET /ingredients: returns a list of vegan ingredients
 * - GET /favorites: returns the current list of favorite recipes
 * - POST /favorites: adds a recipe to favorites
 * - DELETE /favorites/:id: removes a recipe from favorites by id
 *
 * The favorites are stored in-memory and reset on page reload.
 * This is sufficient for development and testing purposes.
 *
 * Note: In a real app, these would be backed by a real database.
 * @ctx {import('msw').RestContext} ctx - MSW context utilities
 * @res {import('msw').ResponseComposition} res - MSW response composition function
 * @req {import('msw').RestRequest} req - MSW request object
 */

// In-memory favorites store for dev
let favorites = [];

export const handlers = [
  // Ingredients list
  rest.get('http://localhost:3000/ingredients', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(veganIngredientList));
  }),

  // Favorites - get all
  rest.get('http://localhost:3000/favorites', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(favorites));
  }),

  // Favorites - add
  rest.post('http://localhost:3000/favorites', async (req, res, ctx) => {
    const body = await req.json();
    // assign a simple incremental id
    const id = favorites.length ? Math.max(...favorites.map(f => f.id || 0)) + 1 : 1;
    const record = { ...body, id };
    favorites.push(record);
    return res(ctx.status(201), ctx.json(record));
  }),

  // Favorites - delete
  rest.delete('http://localhost:3000/favorites/:id', (req, res, ctx) => {
    const { id } = req.params;
    const idx = favorites.findIndex(f => String(f.id) === String(id) || String(f.spoonacularId || '') === String(id));
    if (idx === -1) return res(ctx.status(404), ctx.json({ message: 'Not found' }));
    const removed = favorites.splice(idx, 1)[0];
    return res(ctx.status(200), ctx.json(removed));
  }),
];

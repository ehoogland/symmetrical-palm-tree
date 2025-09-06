import { rest } from 'msw';
import { veganIngredientList } from '../data/veganIngredients';

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

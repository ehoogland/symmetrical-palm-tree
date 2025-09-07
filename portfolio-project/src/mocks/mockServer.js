import { veganIngredientList } from '../data/veganIngredients';

/**
 * Development mock server (in-browser)
 *
 * Intercepts `window.fetch` when `startMockServer()` is called in development.
 * Persists user-added favorites and ingredients to `localStorage` under
 * the keys `mock:favorites` and `mock:ingredients` so data survives reloads.
 *
 * Supported endpoints (subset):
 * - GET /ingredients
 * - POST /ingredients
 * - DELETE /ingredients/:id (only user-added)
 * - GET/POST/DELETE /favorites
 */

const STORAGE_KEY = 'mock:favorites';
const ING_STORAGE_KEY = 'mock:ingredients';
let favorites = [];
let storedIngredients = [];

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) favorites = JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse favorites from localStorage, starting empty', e);
    favorites = [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.warn('Failed to save favorites to localStorage', e);
  }
}

// initialize from storage
if (typeof window !== 'undefined') loadFavorites();
// load stored ingredients (user-added)
function loadIngredients() {
  try {
    const raw = localStorage.getItem(ING_STORAGE_KEY);
    if (raw) storedIngredients = JSON.parse(raw);
  console.debug('mockServer: loaded storedIngredients', storedIngredients);
  } catch (e) {
    console.warn('Failed to parse stored ingredients from localStorage, starting empty', e);
    storedIngredients = [];
  }
}

function saveIngredients() {
  try {
    localStorage.setItem(ING_STORAGE_KEY, JSON.stringify(storedIngredients));
  console.debug('mockServer: saved storedIngredients', storedIngredients);
  } catch (e) {
    console.warn('Failed to save stored ingredients to localStorage', e);
  }
}

if (typeof window !== 'undefined') loadIngredients();

function matchesUrl(url, path) {
  try {
    const u = new URL(url, window.location.origin);
    return u.pathname === path || u.href.includes(path);
  } catch (e) {
    return false;
  }
}

function overrideFetch() {
  const originalFetch = window.fetch;
  console.info('mockServer: installing fetch override');
  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input.url;
    const method = (init.method || 'GET').toUpperCase();

    // Ingredients - return seeded + stored additions
    if (matchesUrl(url, '/ingredients') && method === 'GET') {
      const merged = Array.isArray(veganIngredientList) ? [...veganIngredientList] : [];
      // append stored user-added ingredients after seeded
      if (Array.isArray(storedIngredients) && storedIngredients.length) merged.push(...storedIngredients);
      return new Response(JSON.stringify(merged), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Ingredients - add (user-added)
  if (matchesUrl(url, '/ingredients') && method === 'POST') {
      const bodyText = init.body || (await input.text?.());
      const body = bodyText ? JSON.parse(bodyText) : {};
      // assign id after max seeded+stored
      const existingIds = [
        ...((Array.isArray(veganIngredientList) && veganIngredientList.map(i => i.id)) || []),
        ...((Array.isArray(storedIngredients) && storedIngredients.map(i => i.id)) || []),
      ].filter(v => typeof v === 'number');
      const id = existingIds.length ? Math.max(...existingIds) + 1 : 1;
      const record = { ...body, id };
  console.info('mockServer: POST /ingredients', record);
  storedIngredients.push(record);
  saveIngredients();
      return new Response(JSON.stringify(record), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    // Favorites - get all
    if (matchesUrl(url, '/favorites') && method === 'GET') {
      return new Response(JSON.stringify(favorites), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

  // Favorites - add
    if (matchesUrl(url, '/favorites') && method === 'POST') {
      const bodyText = init.body || (await input.text?.());
      const body = bodyText ? JSON.parse(bodyText) : {};
      const id = favorites.length ? Math.max(...favorites.map(f => f.id || 0)) + 1 : 1;
  const record = { ...body, id };
  favorites.push(record);
  saveFavorites();
      return new Response(JSON.stringify(record), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    // Favorites - delete
    if (url.includes('/favorites/') && method === 'DELETE') {
      const parts = url.split('/');
      const id = parts[parts.length - 1];
      const idx = favorites.findIndex(f => String(f.id) === String(id) || String(f.spoonacularId || '') === String(id));
      if (idx === -1) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  const removed = favorites.splice(idx, 1)[0];
  saveFavorites();
  return new Response(JSON.stringify(removed), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Ingredients - delete (only allow deleting user-added stored ingredients)
    if (url.includes('/ingredients/') && method === 'DELETE') {
      const parts = url.split('/');
      const id = parts[parts.length - 1];
      const idx = storedIngredients.findIndex(i => String(i.id) === String(id));
      if (idx === -1) {
        // Do not delete seeded ingredients via mock; return 404
        console.info('mockServer: DELETE /ingredients not found or seeded', id);
        return new Response(JSON.stringify({ message: 'Not found or cannot delete seeded ingredient' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
      const removed = storedIngredients.splice(idx, 1)[0];
      saveIngredients();
      console.info('mockServer: DELETE /ingredients removed', removed);
      return new Response(JSON.stringify(removed), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Fallback to original fetch for anything else
    return originalFetch(input, init);
  };
  return () => { window.fetch = originalFetch; };
}

export function startMockServer() {
  if (process.env.NODE_ENV !== 'development') return () => {};
  return overrideFetch();
}

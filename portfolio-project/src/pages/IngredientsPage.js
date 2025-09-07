import React, { useEffect, useState } from 'react';
/** @typedef {import('../types').Ingredient} Ingredient */
import IngredientCard from '../IngredientCard';
import { veganIngredientList as seededIngredients } from '../data/veganIngredients';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSelectedIngredient, clearSelected, fetchIngredients, addIngredient, deleteIngredient } from '../store/slices/ingredientsSlice';

/**
 * IngredientsPage
 *
 * Renders the vegan ingredients list, fetches the list on mount, and exposes
 * add / delete / select interactions backed by Redux thunks and actions.
 *
 * Notes:
 * - `fetchIngredients()` is dispatched on mount to populate the store.
 * - `addIngredient()` and `deleteIngredient()` call the dev API to persist
 *   user-added items.
 * - `seededIds` (declared below) is a memoized Set<number> of built-in
 *   ingredient IDs; used to hide/disable the remove action for seeded items.
 *
 * Memoization note:
 * - Memoization caches the result of a computation so it can be reused on
 *   subsequent renders without recomputing. Here we use `React.useMemo` to
 *   compute `seededIds` once (the set of built-in IDs) because the seeded
 *   dataset is static. This avoids creating a new Set on every render which
 *   would cause unnecessary work and could break referential equality checks.
 *
 * About thunks:
 * - A "thunk" in Redux is a function that encapsulates side effects and
 *   async logic so it can be dispatched like an action. In Redux Toolkit an
 *   async thunk (created with `createAsyncThunk`) returns a promise-like
 *   object when dispatched; that object exposes an `abort()` method wired to
 *   the thunk's internal `AbortController`. We dispatch `fetchIngredients()`
 *   here to load data and call `promise.abort()` in the cleanup to cancel the
 *   request if the component unmounts early.
 *
 * About `useEffect`:
 * - `useEffect` is the React hook for running side effects (data fetching,
 *   subscriptions, timers) after render. The dependencies array controls when
 *   the effect re-runs; an empty array `[]` runs the effect once on mount.
 *   Effects may return a cleanup function that runs before the effect
 *   re-executes or when the component unmounts — we use this to abort the
 *   in-flight thunk and avoid state updates on an unmounted component.
 */

export default function IngredientsPage() {
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const veganIngredientList = useSelector(state => state.ingredients.veganList || []);
  const selectedIngredients = useSelector(state => state.ingredients.selected || []);
  const loading = useSelector(state => state.ingredients.loading);
  const error = useSelector(state => state.ingredients.error);
  const dispatch = useDispatch();

  const seededIds = React.useMemo(() => new Set((seededIngredients || []).map(i => i.id)), []);

  useEffect(() => {
    // Dispatch the thunk and capture the returned promise so we can abort
    // the underlying request if the component unmounts quickly.
    const promise = dispatch(fetchIngredients());
    return () => {
      // The promise returned by dispatching an async thunk exposes an
      // `abort()` method which will trigger the thunk's internal
      // AbortController (thunkAPI.signal).
      if (promise && typeof promise.abort === 'function') promise.abort();
    };
  }, [dispatch]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
  if (!newName.trim()) return;
  const payload = { name: newName, category: newCategory };
  console.debug('IngredientsPage: adding ingredient', payload);
  dispatch(addIngredient(payload));
    setNewName('');
    setNewCategory('');
  };

  return (
    <div className="container">
      <div className="ingredients-grid">
        {/* Add Ingredient Form */}
        <form className="mb-4 d-flex gap-2 justify-content-center" onSubmit={handleAddIngredient}>
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: 220 }}
            placeholder="Ingredient name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: 180 }}
            placeholder="Category (optional)"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <button className="btn btn-vegan" type="submit">Add</button>
        </form>

        <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
          🥬 Complete Vegan Ingredients Guide
        </h3>
        <p className="text-center mb-4" style={{ color: 'var(--vegan-dark)', opacity: 0.8 }}>
          Explore {veganIngredientList.length} plant-based ingredients for your vegan journey
        </p>

        {selectedIngredients.length > 0 && (
          <div className="selected-ingredients-section mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ color: 'var(--vegan-primary)' }}>
                🌟 Selected Ingredients ({selectedIngredients.length})
              </h5>
              <div className="d-flex gap-2">
                <NavLink to="/recipes" className="btn btn-vegan btn-sm">
                  🔍 Find Recipes
                </NavLink>
                <button 
                  className="btn btn-vegan-outline btn-sm"
                  onClick={() => dispatch(clearSelected())}
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="selected-ingredients-list d-flex flex-wrap gap-2 mb-3">
              {selectedIngredients.map(ingredient => (
                <span key={ingredient.id} className="badge bg-success d-flex align-items-center gap-1" style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}>
                  {ingredient.name}
                  <button className="btn-close btn-close-white" style={{ fontSize: '0.6rem' }} onClick={() => dispatch(toggleSelectedIngredient(ingredient))} aria-label="Remove ingredient" />
                </span>
              ))}
            </div>
          </div>
        )}

        {loading && <div className="text-center my-4">Loading ingredients...</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <div className="row g-0">
      {veganIngredientList.map(ingredient => (
            <div key={ingredient.id} className="col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
              <IngredientCard 
                ingredient={ingredient}
                isSelected={selectedIngredients.some(s => s && s.name === ingredient.name)}
                onSelect={() => dispatch(toggleSelectedIngredient(ingredient))}
        onRemove={!seededIds.has(ingredient.id) ? () => dispatch(deleteIngredient(ingredient.id)) : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


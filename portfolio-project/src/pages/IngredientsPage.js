import React, { useEffect, useState } from 'react';
import IngredientCard from '../IngredientCard';
import { veganIngredientList as seededIngredients } from '../data/veganIngredients';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSelectedIngredient, clearSelected, fetchIngredients, addIngredient, deleteIngredient } from '../store/slices/ingredientsSlice';

/**
 * IngredientsPage
 *
 * Page that lists vegan ingredients. Reads ingredient list from the Redux store
 * and provides add/delete/select interactions via dispatched thunks and actions.
 *
 * - fetchIngredients is dispatched on mount to populate the store
 * - addIngredient dispatches a POST to the dev server
 * - deleteIngredient dispatches a DELETE for user-added ingredients
 */
export default function IngredientsPage() {
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const veganIngredientList = useSelector(state => state.ingredients.veganList || []);
  const selectedIngredients = useSelector(state => state.ingredients.selected || []);
  const loading = useSelector(state => state.ingredients.loading);
  const error = useSelector(state => state.ingredients.error);
  const dispatch = useDispatch();

  // Precompute seeded IDs so we don't show remove buttons for built-in items
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


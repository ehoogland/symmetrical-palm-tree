import React, { useContext } from 'react';
import { AppContext } from '../App';
import IngredientCard from '../IngredientCard';
import { NavLink } from 'react-router-dom';

export default function IngredientsPage() {
  const ctx = useContext(AppContext);
  return (
    <div className="container">
      <div className="ingredients-grid">
        <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
          🥬 Complete Vegan Ingredients Guide
        </h3>
        <p className="text-center mb-4" style={{ color: 'var(--vegan-dark)', opacity: 0.8 }}>
          Explore {ctx.veganIngredientList.length} plant-based ingredients for your vegan journey
        </p>

        {ctx.selectedIngredients.length > 0 && (
          <div className="selected-ingredients-section mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ color: 'var(--vegan-primary)' }}>
                🌟 Selected Ingredients ({ctx.selectedIngredients.length})
              </h5>
              <div className="d-flex gap-2">
                <NavLink to="/recipes" className="btn btn-vegan btn-sm">
                  🔍 Find Recipes
                </NavLink>
                <button 
                  className="btn btn-vegan-outline btn-sm"
                  onClick={ctx.clearSelectedIngredients}
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="selected-ingredients-list d-flex flex-wrap gap-2 mb-3">
              {ctx.selectedIngredients.map(ingredient => (
                <span key={ingredient.id} className="badge bg-success d-flex align-items-center gap-1" style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}>
                  {ingredient.name}
                  <button className="btn-close btn-close-white" style={{ fontSize: '0.6rem' }} onClick={() => ctx.handleIngredientSelect(ingredient)} aria-label="Remove ingredient" />
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="row g-0">
          {ctx.veganIngredientList.map(ingredient => (
            <div key={ingredient.id} className="col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
              <IngredientCard 
                ingredient={ingredient}
                isSelected={ctx.isIngredientSelected(ingredient)}
                onSelect={ctx.handleIngredientSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from 'react';
import { AppContext } from '../App';
import { NavLink } from 'react-router-dom';

export default function FavoritesPage() {
  const ctx = useContext(AppContext);
  return (
    <div className="container">
      <div className="favorites-section">
        <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
          ❤️ Your Favorite Vegan Recipes
        </h3>
        {ctx.favorites.length === 0 ? (
          <div className="text-center mt-5 p-5" style={{ 
            backgroundColor: 'var(--vegan-light)', 
            borderRadius: '20px',
            border: '2px dashed var(--vegan-accent)'
          }}>
            <h5 style={{ color: 'var(--vegan-primary)' }}>No favorites yet!</h5>
            <p style={{ color: 'var(--vegan-dark)', opacity: 0.8 }}>
              🔍 Search for recipes and click the heart icon to save your favorites
            </p>
            <NavLink to="/recipes" className="btn btn-vegan mt-3">
              🌱 Start Searching Recipes
            </NavLink>
          </div>
        ) : (
          <div className="row">
            {ctx.favorites.map(recipe => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <NavLink to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card h-100" style={{ 
                    borderRadius: '15px', 
                    border: '2px solid var(--vegan-accent)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="position-relative">
                      <img 
                        src={recipe.image} 
                        className="card-img-top" 
                        alt={recipe.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <button
                        className="btn btn-danger position-absolute"
                        style={{ top: '10px', right: '10px', borderRadius: '50%', width: '40px', height: '40px' }}
                        onClick={(e) => { e.preventDefault(); ctx.removeFromFavorites(recipe.id); }}
                        title="Remove from favorites"
                      >
                        💔
                      </button>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title" style={{ color: 'var(--vegan-primary)' }}>
                        {recipe.title}
                      </h5>
                      <div className="mt-auto">
                        <small className="text-muted">
                          🕒 Ready in {recipe.readyInMinutes || 'N/A'} minutes
                        </small>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

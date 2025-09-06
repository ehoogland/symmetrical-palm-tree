import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites, removeFavorite } from '../store/slices/favoritesSlice';

export default function FavoritesPage() {
  const favorites = useSelector(state => state.favorites.list || []);
  const loading = useSelector(state => state.favorites.loading);
  const error = useSelector(state => state.favorites.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="favorites-section">
        <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
          ❤️ Your Favorite Vegan Recipes
        </h3>
  {loading && <div className="text-center my-4">Loading favorites...</div>}
  {error && <div className="alert alert-danger text-center">{error}</div>}
  {favorites.length === 0 && !loading ? (
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
            {favorites.map(recipe => {
              const key = recipe?.id ?? recipe?.spoonacularId ?? Math.random();
              const card = (
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
                      onClick={(e) => { e.preventDefault(); dispatch(removeFavorite(recipe.id)); }}
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
              );

              return (
                <div key={key} className="col-md-4 mb-4">
                  {(recipe && (recipe.id || recipe.spoonacularId)) ? (
                    <NavLink to={`/recipe/${recipe.id || recipe.spoonacularId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {card}
                    </NavLink>
                  ) : (
                    card
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

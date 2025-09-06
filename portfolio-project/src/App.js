import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles/vegan-theme.css';
import SubscribeForm from './components/SubscribeForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from './store/slices/ingredientsSlice';
// removed direct seeding import; ingredients are sourced from the store via fetch
import { toggleSubscribe as toggleSubscribeAction } from './store/slices/uiSlice';

function App() {
  const dispatch = useDispatch(); // Redux dispatch function
  const favorites = useSelector(state => state.favorites.list || []);
  const showSubscribe = useSelector(state => state.ui?.showSubscribe);
  const ingredientCount = useSelector(state => (state.ingredients.veganList || []).length);

  /** Load ingredients on app start so counts and pages have data immediately 
   * This also ensures that the ingredients are loaded into the Redux store
   * for use in other components/pages that need them.
   * The fetchIngredients action handles loading state and errors internally.
   * We only want to fetch ingredients once when the App component mounts.
   * The dependency array includes dispatch to avoid warnings, but dispatch is stable
   * and won't cause re-fetching.
  */
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  
  // Toggle the subscribe form visibility
  const handleToggleSubscribe = () => dispatch(toggleSubscribeAction()); 
  return (
    <div>
      {/* Vegan-themed header */}
      <div className="vegan-header">
        <div className="container text-center">
          <h1>🌱 Vegan Ingredients & Recipes</h1>
          <p className="subtitle">Discover plant-based ingredients and find delicious vegan recipes</p>
          {/* Navigation Tabs as Links */}
          <div className="nav-tabs-container mt-4">
            <div className={`btn-group ${showSubscribe ? 'subscribe-open' : ''}`} role="group">
              <NavLink to="/ingredients" className="btn btn-vegan-outline btn-ingredients">
                🥬 Ingredients ({ingredientCount})
              </NavLink>
              <NavLink to="/recipes" className="btn btn-vegan-outline btn-recipes">
                🔍 Recipe Search
              </NavLink>
              <NavLink to="/favorites" className="btn btn-vegan-outline btn-favorites">
                ❤️ Favorites ({favorites.length})
              </NavLink>
              <button
                type="button"
                className={`btn btn-vegan-outline btn-subscribe ${showSubscribe ? 'active' : ''}`}
                onClick={handleToggleSubscribe}
                aria-pressed={showSubscribe}
              >
                🔔 Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
  {/** 
   * @component SubscribeForm
   * @description A form component for subscribing to updates
   * @prop {function} onClose - Callback function to close the subscription form
   * @component Outlet
   * @description React Router Outlet for rendering nested/child routes
   * @see SubscribeForm (Subscribe form component)
   * @see Outlet (React Router)
   * Show either the SubscribeForm or the current page content (Outlet) based on showSubscribe state
   * If showing the SubscribeForm, it should have an onClose prop to toggle the state
   * If showSubscribe is truthy → render the SubscribeForm component. Otherwise → render the React 
   * Router <Outlet /> (the place where nested/child routes render).
  */}
  {showSubscribe ? <SubscribeForm onClose={handleToggleSubscribe} /> : <Outlet />}

      {/* Sustainability footer */}
      <div className="vegan-footer">
        <div className="container">
          <p className="sustainability-message">
            🌍 "Every plant-based meal is a step toward a more sustainable future" 🌿
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

import IngredientCard from "./IngredientCard";
import { veganIngredientList } from "./data/veganIngredientsClean";
import RecipeSearch from "./components/RecipeSearch";
import './styles/vegan-theme.css';

function App() {
  return (
    <div>
      {/* Vegan-themed header */}
      <div className="vegan-header">
        <div className="container text-center">
          <h1>🌱 Vegan Ingredients & Recipes</h1>
          <p className="subtitle">Discover plant-based ingredients and find delicious vegan recipes</p>
        </div>
      </div>
      
      {/* Recipe Search Section */}
      <div className="container">
        <div className="recipe-search">
          <RecipeSearch veganIngredients={veganIngredientList} />
        </div>
      </div>
      
      {/* Ingredients List Section */}
      <div className="container">
        <div className="ingredients-grid">
          <h3 className="text-center mb-4" style={{ color: 'var(--vegan-primary)' }}>
            🥬 Complete Vegan Ingredients Guide
          </h3>
          <p className="text-center mb-4" style={{ color: 'var(--vegan-dark)', opacity: 0.8 }}>
            Explore {veganIngredientList.length} plant-based ingredients for your vegan journey
          </p>
          <div className="row g-0"> {/* Remove Bootstrap's default gutters */}
            {veganIngredientList.map(ingredient => (
              <div key={ingredient.id} className="col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
                <IngredientCard ingredient={ingredient}/>
              </div>
            ))}
          </div>
        </div>
      </div>

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

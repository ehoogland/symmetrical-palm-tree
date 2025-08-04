import IngredientCard from "./IngredientCard";
import { veganIngredientList } from "./data/veganIngredients";

function App() {
  return (
    <div>
      <h2 className="text-center">Vegan Ingredients</h2>
      {veganIngredientList.map(ingredient => (
        <IngredientCard key={ingredient.id} ingredient={ingredient}/>
      ))}
    </div>
  );
}

export default App;

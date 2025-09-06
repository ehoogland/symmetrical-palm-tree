import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { recipeService } from '../services';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      setError('');
      try {
        const data = await recipeService.getRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p className="text-danger">{error}</p></div>;
  if (!recipe) return <div className="container"><p>No recipe found.</p></div>;

  return (
    <div className="container">
      <h2 style={{ color: 'var(--vegan-primary)' }}>{recipe.title}</h2>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', borderRadius: '15px', marginBottom: '1rem' }} />
      )}
      {recipe.summary && (
        <div style={{ color: 'var(--vegan-dark)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      )}
      {recipe.extendedIngredients && (
        <div style={{ marginBottom: '1rem' }}>
          <h4>Ingredients</h4>
          <ul>
            {recipe.extendedIngredients.map(ing => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        </div>
      )}
      {recipe.instructions && (
        <div>
          <h4>Instructions</h4>
          <div style={{ color: 'var(--vegan-dark)' }} dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
      )}
      {!recipe.instructions && recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
        <div>
          <h4>Instructions</h4>
          <ol>
            {recipe.analyzedInstructions[0].steps.map((step, idx) => (
              <li key={idx}>{step.step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

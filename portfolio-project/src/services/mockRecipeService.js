// Mock recipe service for when API limit is reached
// This file was suggested by GitHub Copilot's AI agent, either Claude Sonnet or ChatGPT to simulate API responses.
export const mockRecipeData = {
  chickpeas: [
    {
      id: 1001,
      title: "Spicy Roasted Chickpeas",
      image: "https://img.spoonacular.com/recipes/157993-312x231.jpg",
      summary: "Crispy roasted chickpeas with cumin, paprika, and a touch of cayenne pepper. Perfect vegan snack!",
      readyInMinutes: 25,
      servings: 4,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    {
      id: 1002,
      title: "Chickpea Curry Bowl",
      image: "https://img.spoonacular.com/recipes/chickpea-curry-312x231.jpg",
      summary: "Hearty chickpea curry with coconut milk, tomatoes, and aromatic spices. Served over rice.",
      readyInMinutes: 30,
      servings: 4,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    {
      id: 1003,
      title: "Mediterranean Chickpea Salad",
      image: "https://img.spoonacular.com/recipes/chickpea-salad-312x231.jpg",
      summary: "Fresh chickpea salad with cucumber, tomatoes, red onion, and lemon dressing.",
      readyInMinutes: 15,
      servings: 3,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    }
  ],
  oats: [
    {
      id: 2001,
      title: "Overnight Oats with Berries",
      image: "https://img.spoonacular.com/recipes/overnight-oats-312x231.jpg",
      summary: "Creamy overnight oats made with plant milk, chia seeds, and fresh berries.",
      readyInMinutes: 5,
      servings: 1,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    {
      id: 2002,
      title: "Baked Oatmeal Squares",
      image: "https://img.spoonacular.com/recipes/baked-oatmeal-312x231.jpg",
      summary: "Wholesome baked oatmeal with cinnamon, vanilla, and maple syrup. Perfect for meal prep!",
      readyInMinutes: 45,
      servings: 9,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    {
      id: 2003,
      title: "Savory Oat Risotto",
      image: "https://img.spoonacular.com/recipes/oat-risotto-312x231.jpg",
      summary: "Creamy savory oats cooked risotto-style with mushrooms and nutritional yeast.",
      readyInMinutes: 25,
      servings: 4,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    }
  ],
  asparagus: [
    {
      id: 3001,
      title: "Asparagus & Pea Soup",
      image: "https://img.spoonacular.com/recipes/asparagus-soup-312x231.jpg",
      summary: "Light and fresh soup with asparagus, peas, and fresh herbs. Perfect spring dish!",
      readyInMinutes: 20,
      servings: 4,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    }
  ],
  millet: [
    {
      id: 4001,
      title: "Millet Pilaf with Vegetables",
      image: "https://img.spoonacular.com/recipes/millet-pilaf-312x231.jpg",
      summary: "Fluffy millet cooked with aromatic spices and mixed vegetables. A nutritious grain bowl!",
      readyInMinutes: 35,
      servings: 4,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    {
      id: 4002,
      title: "Millet Breakfast Porridge",
      image: "https://img.spoonacular.com/recipes/millet-porridge-312x231.jpg",
      summary: "Creamy millet porridge with almond milk, cinnamon, and fresh fruit toppings.",
      readyInMinutes: 25,
      servings: 2,
      vegetarian: true,
      vegan: true,
      glutenFree: true
    }
  ]
};

export const mockRecipeService = {
  findRecipesByIngredients: async (ingredients, number = 12) => {
    console.log('🎭 Using MOCK data - API limit reached');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let allResults = [];
    
    // Check which ingredients we have mock data for
    ingredients.forEach(ingredient => {
      const ingredientKey = ingredient.toLowerCase();
      if (mockRecipeData[ingredientKey]) {
        allResults = [...allResults, ...mockRecipeData[ingredientKey]];
      }
    });
    
    // If no specific matches, return some general recipes
    if (allResults.length === 0) {
      allResults = [
        ...mockRecipeData.chickpeas.slice(0, 1),
        ...mockRecipeData.oats.slice(0, 1)
      ];
    }
    
    console.log(`🎭 Mock service returning ${Math.min(allResults.length, number)} recipes`);
    return allResults.slice(0, number);
  },

  searchVeganRecipes: async (query = '', includeIngredients = '', number = 12) => {
    console.log('🎭 Using MOCK vegan search - API limit reached');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple keyword matching
    const queryLower = query.toLowerCase();
    let results = [];
    
    if (queryLower.includes('chickpea') || queryLower.includes('garbanzo')) {
      results = [...results, ...mockRecipeData.chickpeas];
    }
    if (queryLower.includes('oat')) {
      results = [...results, ...mockRecipeData.oats];
    }
    if (queryLower.includes('asparagus')) {
      results = [...results, ...mockRecipeData.asparagus];
    }
    if (queryLower.includes('millet')) {
      results = [...results, ...mockRecipeData.millet];
    }
    
    // If no matches, return some general results
    if (results.length === 0) {
      results = [
        ...mockRecipeData.chickpeas.slice(0, 2),
        ...mockRecipeData.oats.slice(0, 2)
      ];
    }
    
    return results.slice(0, number);
  },

  getRecipeDetails: async (recipeId) => {
    console.log('🎭 Using MOCK recipe details - API limit reached');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find the recipe in our mock data
    for (const category of Object.values(mockRecipeData)) {
      const recipe = category.find(r => r.id === recipeId);
      if (recipe) {
        return {
          ...recipe,
          instructions: [
            { number: 1, step: "Prepare all ingredients according to the recipe requirements." },
            { number: 2, step: "Follow standard cooking techniques for this type of dish." },
            { number: 3, step: "Season to taste and serve immediately." }
          ],
          extendedIngredients: [
            { original: "Main ingredients as listed in recipe title" },
            { original: "Seasonings and spices to taste" },
            { original: "Optional garnishes" }
          ]
        };
      }
    }
    
    // Default recipe if not found
    return {
      id: recipeId,
      title: "Sample Vegan Recipe",
      summary: "A delicious vegan recipe using wholesome ingredients.",
      instructions: [
        { number: 1, step: "This is a sample recipe for testing purposes." }
      ]
    };
  }
};

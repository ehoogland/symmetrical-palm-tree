// Debugging
// This script is used to test API calls directly, and because there is an API key required 
// for authentication it is included in .gitignore
// This is a temporary script for debugging purposes and should not be used in production.
// The script was suggested by GitHub Copilot's AI agent, either Claude Sonnet or ChatGPT.

// Debug script to test API calls directly
const API_KEY = '84e8ea20b5fb4e47a9bc0ea528319d56';

async function testIngredientSearch(ingredient) {
  console.log(`\n🧪 Testing: ${ingredient}`);
  console.log('='.repeat(40));
  
  try {
    // Test findByIngredients endpoint
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredient}&number=5&ranking=1&ignorePantry=true`;
    console.log('URL:', url);
    
    const response = await fetch(url);
    console.log('Status:', response.status);
    
    if (!response.ok) {
      console.error('❌ Response not OK:', response.statusText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ Response received');
    console.log('Number of recipes found:', data.length);
    
    if (data.length > 0) {
      console.log('First recipe:', data[0].title);
      console.log('Missing ingredients:', data[0].missedIngredientCount);
      console.log('Used ingredients:', data[0].usedIngredientCount);
    } else {
      console.log('🚫 No recipes found for this ingredient');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function testComplexSearch(ingredient) {
  console.log(`\n🔍 Complex Search Test: ${ingredient}`);
  console.log('='.repeat(40));
  
  try {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&diet=vegan&includeIngredients=${ingredient}&number=5&addRecipeInformation=true`;
    console.log('URL:', url);
    
    const response = await fetch(url);
    console.log('Status:', response.status);
    
    if (!response.ok) {
      console.error('❌ Response not OK:', response.statusText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ Response received');
    console.log('Number of recipes found:', data.results?.length || 0);
    
    if (data.results && data.results.length > 0) {
      console.log('First recipe:', data.results[0].title);
    } else {
      console.log('🚫 No recipes found for this ingredient');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API Debug Tests');
  console.log('API Key:', API_KEY ? 'Present' : 'Missing');
  
  const ingredients = ['chickpeas', 'oats', 'asparagus', 'peas'];
  
  for (const ingredient of ingredients) {
    await testIngredientSearch(ingredient);
    await testComplexSearch(ingredient);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between calls
  }
  
  console.log('\n✨ Tests completed!');
}

// Run the tests
runTests().catch(console.error);

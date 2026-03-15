# Spoonacular API Setup Guide

## Getting Started with Spoonacular API

### 1. Get Your Free API Key
1. Go to [Spoonacular API](https://spoonacular.com/food-api)
2. Click "Get API Key" 
3. Create a free account
4. Copy your API key

### 2. Add API Key to Your Project
1. Open the `.env` file in your project root
2. Replace `your_api_key_here` with your actual API key:
   ```
   REACT_APP_SPOONACULAR_API_KEY=your_actual_api_key_here
   ```

### 3. Restart Your Development Server
After adding the API key, restart your React app:
```bash
npm start
```

## Spoonacular Vegan Features

### What Makes Spoonacular Great for Vegan Recipes:
- ✅ **Dedicated vegan filter**: `diet=vegan` parameter
- ✅ **Ingredient-based search**: Find recipes using your vegan ingredients
- ✅ **Recipe details**: Full ingredients list, instructions, nutrition info
- ✅ **Large database**: Thousands of vegan recipes
- ✅ **Free tier**: 150 requests/day (plenty for development)

### API Endpoints Used:
1. **Complex Search** - Search recipes with vegan filter
2. **Find by Ingredients** - Find recipes using specific ingredients from your list
3. **Recipe Information** - Get detailed recipe info

### Your Vegan Recipe Features:
- Search for vegan recipes by name
- Select ingredients from your vegan list to find matching recipes
- View recipe images, cooking time, and instructions
- Bootstrap responsive design

## Free Tier Limits:
- 150 requests per day
- Perfect for development and small personal projects
- Upgrade available for production apps

## Example Searches to Try:
- "vegan pasta"
- "quinoa salad" 
- "lentil curry"
- Select ingredients like: lentils, quinoa, spinach, tomatoes

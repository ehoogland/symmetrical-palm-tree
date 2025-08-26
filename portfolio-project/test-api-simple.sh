#!/bin/bash
# Simple test script for Spoonacular API with hardcoded API key
# This script was suggested by Github Copilot's AI agent, which was Claude Sonnet
echo "🧪 Testing Spoonacular API for Chickpeas and Oats"
echo "================================================"

echo ""
echo "🔍 Testing Chickpeas:"
echo "---------------------"
curl -s "https://api.spoonacular.com/recipes/findByIngredients?apiKey=84e8ea20b5fb4e47a9bc0ea528319d56&ingredients=chickpeas&number=3&ranking=1&ignorePantry=true" | head -10

echo ""
echo "🔍 Testing Oats:"
echo "----------------"
curl -s "https://api.spoonacular.com/recipes/findByIngredients?apiKey=84e8ea20b5fb4e47a9bc0ea528319d56&ingredients=oats&number=3&ranking=1&ignorePantry=true" | head -10

echo ""
echo "🔍 Testing Vegan Complex Search for Chickpeas:"
echo "----------------------------------------------"
curl -s "https://api.spoonacular.com/recipes/complexSearch?apiKey=84e8ea20b5fb4e47a9bc0ea528319d56&diet=vegan&includeIngredients=chickpeas&number=3&addRecipeInformation=true" | head -10

echo ""
echo "🔍 Testing Vegan Complex Search for Oats:"
echo "-----------------------------------------"
curl -s "https://api.spoonacular.com/recipes/complexSearch?apiKey=84e8ea20b5fb4e47a9bc0ea528319d56&diet=vegan&includeIngredients=oats&number=3&addRecipeInformation=true" | head -10

echo ""
echo "✅ API Test Complete"

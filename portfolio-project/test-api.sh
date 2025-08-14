#!/bin/bash

# Test Spoonacular API Key
echo "Testing Spoonacular API Key..."
echo "================================"

# Get the API key from .env file
API_KEY=$(grep REACT_APP_SPOONACULAR_API_KEY .env | cut -d '=' -f2)
echo "API Key: ${API_KEY:0:8}..." # Show first 8 characters only

# Test the API with a simple request
echo ""
echo "Making test request..."
curl -s "https://api.spoonacular.com/recipes/complexSearch?apiKey=$API_KEY&diet=vegan&number=1" > api_test_response.json

# Check if the response contains an error
if grep -q "error" api_test_response.json; then
    echo "❌ API Error detected:"
    cat api_test_response.json | jq . 2>/dev/null || cat api_test_response.json
elif grep -q "results" api_test_response.json; then
    echo "✅ API Key is working!"
    echo "Sample response:"
    cat api_test_response.json | jq .results[0].title 2>/dev/null || echo "Response received (install jq for pretty formatting)"
else
    echo "⚠️  Unexpected response:"
    cat api_test_response.json
fi

echo ""
echo "Full response saved to: api_test_response.json"

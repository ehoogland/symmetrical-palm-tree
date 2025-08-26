# This script was suggested by Github Copilot. Because it contains API keys, it is included in .gitignore and is not included in version control. It should not be included in production.
# API Testing Commands for Spoonacular

## Simple API Test Command
Copy and paste this command into your terminal:

```bash
curl -s "https://api.spoonacular.com/recipes/complexSearch?apiKey=84e8ea20b5fb4e47a9bc0ea528319d56&diet=vegan&number=1"
```

## Alternative Test (if curl doesn't work)
```bash
node -e "
const https = require('https');
const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=84e8ea20b5fb4e47a9bc0ea528319d56&diet=vegan&number=1';
https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
}).on('error', err => console.error('Error:', err.message));
"
```

## Check Environment Variable
```bash
echo $REACT_APP_SPOONACULAR_API_KEY
```

## Restart Development Server
```bash
npm start
```

## Instructions:
1. Open Terminal in your project folder
2. Copy one of the commands above
3. Paste and press Enter
4. Look for error messages or successful responses

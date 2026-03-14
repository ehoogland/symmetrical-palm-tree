// first made a node-express folder
// copied public folder into node-express (used finder)
// ran npm init -y in node-express folder (and changed default name from express to node-express)
// ran npm install express while in node-express folder to install Express
// made sure node_modules was in existing .gitignore

// If initiating a new local repository, create a new .gitignore with node_modules in it
// In React and React Native I used create-react-app and expo-init to scaffold out
// starter files. You did not need to create a .gitignore file (or initiate a Git
// repository) manually because those CLI tools automatically did so for you. 
// Here, if these are not present in a parent directory of an existing repository,
// you do it manually

// Create this server.js file and start the server using npm start

const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

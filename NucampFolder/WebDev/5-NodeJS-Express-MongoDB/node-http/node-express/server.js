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
// npm install morgan, require it, and add app.use(morgan('dev')) language
// Ctrl+C to quit server, start server, and observe behavior in browser and Postman
// Do a git commit 

const express = require('express');

// require morgan after getting express up
const morgan = require('morgan');

// require the express router after getting express up
const campsiteRouter = require('./routes/campsiteRouter');

// Task 2 part 2: Mounted the Express router on the /promotions path in server.js so that it can 
// handle requests to both /promotions and /promotions/:promotionId.
const promotionRouter = require('./routes/promotionRouter');

// Task 3 part 2: mounted the Express router on the /partners path in server.js so that it can 
// handle requests to both /partners and /partners/:partnerId.
const partnerRouter = require('./routes/partnerRouter');



    
const hostname = 'localhost';
const port = 3000;

const app = express();
// add morgan
app.use(morgan('dev'));
// use express router
app.use(express.json());

// all of the remaining express router language gets moved to campsiteRouter.js
/*
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
    });
    
    app.delete('/campsites/:campsiteId', (req, res) => {
        res.end(`Deleting campsite: ${req.params.campsiteId}`);
    });
    // end added express router language
 */
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);
 
app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});











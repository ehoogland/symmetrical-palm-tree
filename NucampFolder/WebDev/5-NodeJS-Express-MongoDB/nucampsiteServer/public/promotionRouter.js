const express = require('express');
const promotionRouter = express.Router();
/*
Task 2 part 1:
Create a Node module named promotionRouter.js that will implement the Express router 
for the following paths:

/promotions
/promotions/:promotionId 

Used campsiteRouter as a template to implement the Express router for these paths.

Note that there is no need for /promotions as opposed to /promotions/:promotionId to be implemented 
in promotionRouter.js. The Express router handles both of these paths because mounting the Express
router on the /promotions path in server.js allows it to handle requests to both /promotions and /promotions/:promotionId.
*/
promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})
.put((req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting promotion: ${req.params.promotionId}`);
    });
    
// Task 2 continued: Made sure to export the Express router from this module and import it 
// into server.js. 
module.exports = promotionRouter;
// Then, mounted the Express router on the /promotions path in server.js so that it can 
// handle requests to both /promotions and /promotions/:promotionId.
 
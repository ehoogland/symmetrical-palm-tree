/**
 * @description The promotionRouter is an instance of the Express Router, which allows us to define routes for handling HTTP requests 
 *              related to promotions. It is used to create modular route handlers for the /promotions endpoint and its sub-routes.
 * @method express.Router() - Creates a new router object that can be used to define routes for handling HTTP requests.
 * @route /promotions - The base route for handling requests related to promotions.
 * @route /promotions/:promotionId - A sub-route for handling requests related to a specific promotion, identified by its unique ID.
 * @methods GET, POST, PUT, DELETE - The HTTP methods that can be used to interact with the /promotions and /promotions/:promotionId routes.
 * @param req - The request object, which contains information about the HTTP request made by the client.
 * @param res - The response object, which is used to send a response back to the client.
 * @param next - A callback function that is used to pass control to the next middleware function in the stack.
 * @method then() - A Mongoose method that is used to handle the result of a query or operation on the database. 
 *                  It takes a callback function as an argument, which is executed when the query or operation is complete.
 * @method catch() - A Mongoose method that is used to handle errors that may occur during a query or operation on the database. 
 *                   It takes a callback function as an argument, which is executed when an error occurs.
 * @param {Object} err - An error object that contains information about any errors that may occur during the execution 
 *                       of a query or operation on the database.
 * @method res.statusCode - A property of the response object that sets the HTTP status code for the response.
 * @param {number} 200 - The HTTP status code for a successful request, indicating that the request was processed successfully.
 * @method res.setHeader() - A method of the response object that sets a specific header for the response.
 * @param {string} 'Content-Type' - The name of the header to set, which indicates the media type of the response.
 * @param {string} 'application/json' - The value of the 'Content-Type' header, which indicates that the response body will be in JSON format.
 * @method res.json() - A method of the response object that sends a JSON response back to the client.
 * @param {Object} promotions - The data to be sent in the JSON response, which is typically an array of promotion objects retrieved from the database.
 * @method res.end() - A method of the response object that ends the response process and sends the response back to the client.
 * @method Promotion.find() - A Mongoose method that retrieves all documents from the Promotion collection in the MongoDB database.
 * @method Promotion.create() - A Mongoose method that creates a new document in the Promotion collection in the MongoDB database.
 * @method Promotion.findById() - A Mongoose method that retrieves a specific document from the Promotion collection by its unique ID.
 * @method Promotion.findByIdAndUpdate() - A Mongoose method that updates a specific document in the Promotion collection by its unique ID.
 * @method Promotion.findByIdAndDelete() - A Mongoose method that deletes a specific document from the Promotion collection by its unique ID.
 * @returns {Object} - The promotionRouter object, which can be used to define routes for handling HTTP requests related to promotions.
 * @module promotionRouter - The module that exports the promotionRouter object for use in other parts of the application.
 * @requires express - The Express library, which is used to create the promotionRouter object and define routes for handling HTTP requests.
 * @requires ../models/promotion - The Promotion model, which is used to interact with the promotions collection in the MongoDB database.
 */
const express = require('express');
const Promotion = require('../models/promotion');
const promotionRouter = express.Router();

promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    ////////// NOTE: Remember, since this router file no longer has an "all" rooute that sets a defailt
// content type, it is best practice to specify it in all cases. I will add it here.
    res.setHeader('Content-Type', 'text/plain');
////////// END NOTE
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

promotionRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})
// The PUT method is used to update an existing promotion document in the database.
// The findByIdAndUpdate() method is called on the Promotion model, passing in the promotionId
// from the request parameters and the updated data from the request body. 
// The $set operator is used to specify which fields should be updated in the document.
// The { new: true } option is used to return the updated document in the response.
// The response is sent back to the client with a status code of 200 and the updated 
// promotion document in JSON format.
.put((req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = promotionRouter;

// Then, mounted the Express router on the /promotions path in server.js so that it can 
// handle requests to both /promotions and /promotions/:promotionId.
 
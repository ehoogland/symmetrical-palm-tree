const express = require('express');
const Partner = require('../models/partner');
const authenticate = require('../authenticate');
const cors = require('./cors');
/**
 * @description The partnerRouter is an instance of the Express Router, which allows us to define routes for handling HTTP requests 
 *              related to partners. It is used to create modular route handlers for the /partners endpoint and its sub-routes.
 * @method express.Router() - Creates a new router object that can be used to define routes for handling HTTP requests.
 * @route /partners - The base route for handling requests related to partners.
 * @route /partners/:partnerId - A sub-route for handling requests related to a specific partner, identified by its unique ID.
 * @methods GET, POST, PUT, DELETE - The HTTP methods that can be used to interact with the /partners and /partners/:partnerId routes.
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
 * @param {Object} partners - The data to be sent in the JSON response, which is typically an array of partner objects retrieved from the database.
 * @method res.end() - A method of the response object that ends the response process and sends the response back to the client.
 * @method Partner.find() - A Mongoose method that retrieves all documents from the Partner collection in the MongoDB database.
 * @method Partner.create() - A Mongoose method that creates a new document in the Partner collection in the MongoDB database.
 * @method Partner.findById() - A Mongoose method that retrieves a specific document from the Partner collection by its unique ID.
 * @method Partner.findByIdAndUpdate() - A Mongoose method that updates a specific document in the Partner collection by its unique ID.
 * @method Partner.findByIdAndDelete() - A Mongoose method that deletes a specific document from the Partner collection by its unique ID.
 * @returns {Object} - The partnerRouter object, which can be used to define routes for handling HTTP requests related to partners.
 * @module partnerRouter - The module that exports the partnerRouter object for use in other parts of the application.
 * @requires express - The Express library, which is used to create the partnerRouter object and define routes for handling HTTP requests.
 * @requires ../models/partner - The Partner model, which is used to interact with the partners collection in the MongoDB database.
 */
/**
 * @const partnerRouter - The router object for handling partner-related routes.
 */
const partnerRouter = express.Router();
/**
 * Set up access points.
 * Access levels across all partner routes:
 *
 * /partners
 *   GET    — public (no auth required)
 *   POST   — admin only  (verifyUser + verifyAdmin)
 *   PUT    — authenticated user (verifyUser); always returns 403 — method not supported
 *   DELETE — admin only  (verifyUser + verifyAdmin)
 *
 * /partners/:partnerId
 *   GET    — public
 *   POST   — authenticated user (verifyUser); always returns 403 — method not supported
 *   PUT    — admin only  (verifyUser + verifyAdmin)
 *   DELETE — admin only  (verifyUser + verifyAdmin)
 */
partnerRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Partner.find()
    .then(partners => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partners);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Partner.create(req.body)
    .then(partner => {
        console.log('Partner Created ', partner);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
/**
 * @description The route handlers for GET, POST, PUT, and DELETE requests are defined for this endpoint, allowing us 
 * to retrieve, create, update, and delete a specific partner by its ID.
 * @Object partnerRouter - The partnerRouter object is used to define the routes for handling HTTP requests related to partners.
 * @method partnerRouter.route() - A method of @Object partnerRouter that is used to define a route for the 
 * /partners/:partnerId endpoint.
 * @param {string} :partnerId - A route parameter that allows access to a specific partner by its unique identifier.
 */
partnerRouter.route('/:partnerId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    })
    .catch(err => next(err));
})
/**
 * @Operation POST is not supported on the /partners/:partnerId endpoint. It is used for creating new partners,
 * not for updating existing ones. A 403 Forbidden status code and an appropriate message are returned.
 * 
 * @Operation PUT allows us to update an existing partner's information.
 * @method Partner.findByIdAndUpdate() - A Mongoose method to find the partner by its ID and update it with the data provided in the request body.
 * @option { new: true } - Ensures that the updated document is returned in the response.
 * 
 * @Operation DELETE is supported on the /partners/:partnerId endpoint, allowing us to delete a specific partner by its ID.
 * @method Partner.findByIdAndDelete() - A Mongoose method to find and remove the partner from the database.
 * The response includes the result of the delete operation, which confirms that the partner was removed.
 * @param {function} authenticate.verifyUser - A Passport middleware function that verifies the user's authentication status before allowing 
 *                                             access to certain routes.
 */
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {      
    res.statusCode = 403;
    res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
})
// The findByIdAndUpdate() method is called on the Partner model, passing in the partnerId
// from the request parameters and the updated data from the request body. 
// The $set operator is used to specify which fields should be updated in the document.
// The { new: true } option is used to return the updated document in the response.
// The response is sent back to the client with a status code of 200 and the updated 
// partner document in JSON format.
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndUpdate(req.params.partnerId, {
        $set: req.body  
    }, { new: true })
    .then(partner => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = partnerRouter;
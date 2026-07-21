// This file defines the routes for handling requests related to campsites. It uses the Express Router to create
// modular routes for the application. The routes are protected by authentication middleware and support CORS.
const express = require('express');
const Campsite = require('../models/campsite');
const campsiteRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

campsiteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Campsite.find()
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.create(req.body)
    .then(campsite => {
        console.log('Campsite Created ', campsite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
/**
 * @description The route handlers for GET, POST, PUT, and DELETE requests are defined for this endpoint, allowing us 
 * to retrieve, create, update, and delete a specific campsite by its ID.
 * @Object campsiteRouter - The campsiteRouter object is used to define the routes for handling HTTP requests related to campsites.
 * @method campsiteRouter.route('/:campsiteId') - A method of @Object campsiteRouter that is used to define a route for the
 * /campsites/:campsiteId endpoint, allowing access to a specific campsite by its unique identifier.
 * @param {string} :campsiteId - A route parameter that allows access to a specific campsite by its unique identifier.
 * @param {function} cors.corsWithOptions - A middleware function that handles CORS for the route, allowing cross-origin requests.
 * @param {function} authenticate.verifyUser - A middleware function that verifies the user's authentication status.
 * @param {function} authenticate.verifyAdmin - A middleware function that verifies if the authenticated user has admin privileges.
 * @param {function} Campsite.findById() - A Mongoose method that retrieves a specific campsite document from the database by its ID.
 * @param {function} Campsite.findByIdAndUpdate() - A Mongoose method that updates a specific campsite document in the database by its ID.
 * @param {function} Campsite.findByIdAndDelete() - A Mongoose method that deletes a specific campsite document from the database by its ID.
 * @returns {void}
 * @method populate('comments.author') - A Mongoose method that populates the author field of the comments subdocument 
 * with the corresponding user document.
 * @method res.json() - A method of the response object that sends a JSON response to the client.
 */ 
 campsiteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})  
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})      
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  Campsite.findByIdAndUpdate(req.params.campsiteId, {
    $set: req.body
  }, { new: true })
  .then(campsite => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(campsite);
  })
  .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = campsiteRouter;
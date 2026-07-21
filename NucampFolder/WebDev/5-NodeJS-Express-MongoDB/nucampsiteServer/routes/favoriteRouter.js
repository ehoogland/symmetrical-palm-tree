const express = require('express');
const mongoose = require('mongoose');       
const Favorite = require("../models/favorite");
//const Campsite = require("../models/campsite");
// create a new router object using the Express Router
// local file-based modules
const cors = require('./cors');
const authenticate = require('../authenticate');
const favoriteRouter = require('express').Router();

// Equivalent to /favorites & https://localhost:3443/favorites
// retrieves the list of favorites for the authenticated user, populating the user and campsites fields with 
// the full documents from their respective collections.
// This route handles the retrieval of the user's list of favorite campsites. It uses the Mongoose populate() method
// to retrieve the full user and campsite documents when querying the favorites collection.
// The route is protected by the verifyUser middleware, which ensures that only authenticated users can access their
// favorites. The response is sent in JSON format with a status code of 200 if successful, or an error is passed to 
// the next middleware if there is an issue.
// The route also uses CORS middleware to handle cross-origin requests, allowing the client application to access the
// favorites data from a different origin.
// The route is defined using the Express Router, which allows for modular routing in the application. The router is
// exported for use in the main application file, where it can be mounted on a specific path (e.g., /favorites).

// Set up two routes for the /favorites endpoint: one for the root path and one for a specific campsite 
// identified by its ID.
// Add preflight OPTIONS requests to handle CORS for both routes, allowing the client application to make cross-origin 
// requests to the server and receive the appropriate response headers.
favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
  Favorite.find({ user: req.user._id })  
  // The populate() method is used to retrieve the full user and campsite documents 
  // when querying the favorites collection.   
    .populate('user')
    .populate('campsites')
    .then(favorite => {
      res.statusCode = 200;  
      res.setHeader('Content-Type', 'application/json');
      res.json(favorite);
    })  
    .catch(err => next(err));
})    
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })  
    .then(favorite => {
      // If the user already has a favorites document, add the new campsites to the existing list.    
      if (favorite) {
        req.body.forEach(campsite => {
          if (!favorite.campsites.includes(campsite._id)) {
            favorite.campsites.push(campsite._id);  
          }  
        });  
        // Save the updated favorites document to the database using the save() method, which 
        // persists the changes to the database.
        favorite.save()
          .then(favorite => {
            res.statusCode = 200;  
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
          })  
          .catch(err => next(err));
      } else {
        // If the user doesn't have a favorites document, create a new one with the specified campsites.  
        Favorite.create({ user: req.user._id, campsites: req.body.map(campsite => campsite._id) })
          .then(favorite => {
            res.statusCode = 200;  
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
          })  
          .catch(err => next(err));
      }    
    })  
    .catch(err => next(err));
})    
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  res.statusCode = 403;  
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /favorites');
})  
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          res.statusCode = 200;  
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        } else {
          res.statusCode = 200; //return a 200 status code with an empty array or a message   
          // indicating that there are no favorites. Could also return a 404 status code to 
          // indicate that the resource was not found, but this is arguably not appropriate in 
          // this case since the user is authenticated and the request was successful.
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "We didn't find any favorites selected" }));
        }  
      })  
      .catch(err => next(err));
});      

// Equivalent to /favorites/:campsiteId & https://localhost:3443/favorites/:campsiteId
// The campsiteId parameter is submitted to the server as part of the URL path, and it is used to identify the 
// specific campsite that the user wants to add to their list of favorites. It is not included in the request body, 
// as it is already part of the URL path. 
// The server extracts the campsiteId from the URL parameters using req.params.campsiteId.
// This route handles the addition of a specific campsite to the user's list of favorites. It checks if the user 
// already has a favorites document, and if so, it adds the campsite to the list if it's not already present. 
// If the user doesn't have a favorites document, it creates one with the specified campsite.
// The route is protected by the verifyUser middleware, which ensures that only authenticated users can modify their
// favorites. The response is sent in JSON format with a status code of 200 if successful, or an error is passed to 
// the next middleware if there is an issue.
// The route also uses CORS middleware to handle cross-origin requests, allowing the client application to modify the
// favorites data from a different origin.
// The route is defined using the Express Router, which allows for modular routing in the application. The router is
// exported for use in the main application file, where it can be mounted on a specific path (e.g., /favorites/:campsiteId).
favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 403;
  res.end('GET operation not supported on /favorites/:campsiteId');
}) 
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        // Check if the campsite is already in the user's favorites. If not, add it to the list and 
        // save the updated document.
        if (!favorite.campsites.includes(req.params.campsiteId)) {
          favorite.campsites.push(req.params.campsiteId);
          favorite.save()
            .then(favorite => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              // Return the updated document in the response body as JSON.
              res.json(favorite);
            })
            .catch(err => next(err));
        } else {
          // If the campsite is already in the user's favorites, return a message indicating that it 
          // is already a favorite.  
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          // Return a message in the response body indicating that the campsite is already a favorite.
          res.end('That campsite is already a favorite!');
        }
      /**
       * Otherwise, since we just checked and the user doesn't have a favorites document, create a new one 
       * with the specified campsite. 
       * @note document is a term of art that refers to the Mongoose document that represents the user's 
       * [array of] favorites in the database. Essentially, it is a set of key-value pairs (stored as BSON) 
       * somewhat analogous to a "row" in a relational database. It is an instance of the Favorite model, 
       * which is defined using a Mongoose schema in models/favorites.js. The document contains the user's 
       * ID and an array of campsite IDs that represent their favorite campsites.
       */
      } else {
        Favorite.create({ 
            user: req.user._id, 
            campsites: [req.params.campsiteId] 
        })
          .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            // Return the newly created document in the response body as JSON.
            res.json(favorite);
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /favorites/' + req.params.campsiteId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        if (favorite) {
            const index = favorite.campsites.indexOf(req.params.campsiteId);
            // If the campsite is found in the user's favorites, remove it from the list 
            // and save the updated document.
            if (index >= 0) {
                favorite.campsites.splice(index, 1);
                favorite.save()
                    .then(favorite => {
                        res.status(200).json(favorite);
                    })
                    .catch(err => next(err));
            } else {
                res.status(200).end('Campsite not found in favorites');
            }
        } else {
            res.status(200).end('There are no favorites to delete');
        }
    })
    .catch(err => next(err));
});

module.exports = favoriteRouter;
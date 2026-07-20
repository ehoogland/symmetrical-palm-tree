const express = require('express');
const favoriteRouter = require('express').Router();
const authenticate = require('../authenticate');
const Favorite = require("../models/favorite");
const User = require("../models/user");
const cors = require('./cors');


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
      if (favorite) {
        req.body.forEach(campsite => {
          if (!favorite.campsites.includes(campsite._id)) {
            favorite.campsites.push(campsite._id);
          }
        });
        favorite.save()
          .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
          })
          .catch(err => next(err));
      } else {
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
  res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOneAndDelete({ user: req.user._id }, { useFindAndModify: false })
    .then(favorite => {
      if (favorite) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'No favorites found for this user' });
      }
    })
    .catch(err => next(err));
});
// equivalent to /favorites & https://localhost:3443/favorites
// This route handles the deletion of the user's list of favorites. It finds the favorites document for the 
// authenticated user and deletes it from the database. If the user has no favorites, it returns a 404 error with
// a message indicating that no favorites were found for the user.
// The route is protected by the verifyUser middleware, which ensures that only authenticated users can delete their
// favorites. The response is sent in JSON format with a status code of 200 if successful, or an error is passed to 
// the next middleware if there is an issue.
// The route also uses CORS middleware to handle cross-origin requests, allowing the client application to delete the
// favorites data from a different origin.
// The route is defined using the Express Router, which allows for modular routing in the application. The router is
// exported for use in the main application file, where it can be mounted on a specific path (e.g., /favorites).
favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
  Favorite.find({ user: req.user._id })
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
      if (favorite) {
        req.body.forEach(campsite => {
          if (!favorite.campsites.includes(campsite._id)) {
            favorite.campsites.push(campsite._id);
          }
        });
        favorite.save()
          .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
          })
          .catch(err => next(err));
      } else {
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
  res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOneAndDelete({ user: req.user._id }, { useFindAndModify: false })
    .then(favorite => {
      if (favorite) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'No favorites found for this user' });
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
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        if (favorite.campsites.includes(req.params.campsiteId)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ message: 'Campsite is already in your favorites' });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ message: 'Campsite is not in your favorites' });
        }
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'Campsite is not in your favorites' });
      }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        if (!favorite.campsites.includes(req.params.campsiteId)) {
          favorite.campsites.push(req.params.campsiteId); // Add the campsite to the user's favorites if it's not already 
          // present using the push() method, which adds the specified campsite ID to the campsites array in the favorite document.
          favorite.save()
            .then(favorite => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            })
            .catch(err => next(err));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        }
      } else {
        Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
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
  res.end('PUT operation not supported on /favorites/:campsiteId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        const index = favorite.campsites.indexOf(req.params.campsiteId);
        if (index !== -1) {
          favorite.campsites.splice(index, 1); // Remove the campsite from the user's favorites using the splice() method, 
          // which removes the specified campsite ID from the array.
          favorite.save()
            .then(favorite => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            })
            .catch(err => next(err));
        }
    else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: 'Campsite not found in your favorites' });
            }
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: 'No favorites found for this user' });
        }
    })
    .catch(err => next(err));
});

// Equivalent to /favorites/:campsiteId & https://localhost:3443/favorites/:campsiteId
// This route handles the deletion of a specific campsite from the user's list of favorites. It finds the favorites 
// document for the authenticated user and removes the specified campsite from the campsites array. If the user has no
// favorites or the specified campsite is not in the list, it returns a 404 error with a message indicating that no 
// favorites were found for the user or that the campsite was not found in the user's favorites.
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
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        if (favorite.campsites.includes(req.params.campsiteId)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ message: 'Campsite is already in your favorites' });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ message: 'Campsite is not in your favorites' });
        }
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'Campsite is not in your favorites' });
      }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        if (!favorite.campsites.includes(req.params.campsiteId)) {
          favorite.campsites.push(req.params.campsiteId);
            favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch(err => next(err));
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
      } else {
        Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
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
  res.end('PUT operation not supported on /favorites/:campsiteId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        const index = favorite.campsites.indexOf(req.params.campsiteId);
        if (index !== -1) {
          favorite.campsites.splice(index, 1); // Remove the campsite from the user's favorites using the splice() method, 
          // which removes the specified campsite ID from the array.
          favorite.save()
            .then(favorite => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            })
            .catch(err => next(err));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.json({ message: 'Campsite not found in your favorites' });
        }
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'No favorites found for this user' });
      }
    })
    .catch(err => next(err));
});
// Equivalent to /favorites/:campsiteId & https://localhost:3443/favorites/:campsiteId
// This route handles the retrieval of a specific campsite from the user's list of favorites. It checks if the user
// has a favorites document and if the specified campsite is included in the campsites array. If the campsite is found,
// it returns a message indicating that the campsite is already in the user's favorites. If the campsite is not found,
// it returns a message indicating that the campsite is not in the user's favorites. If the user has no favorites, it
// also returns a message indicating that the campsite is not in the user's favorites.
// The route is protected by the verifyUser middleware, which ensures that only authenticated users can access their
// favorites. The response is sent in JSON format with a status code of 200 if successful, or an error is passed to 
// the next middleware if there is an issue.
// The route also uses CORS middleware to handle cross-origin requests, allowing the client application to access the
// favorites data from a different origin.
// The route is defined using the Express Router, which allows for modular routing in the application. The router is
// exported for use in the main application file, where it can be mounted on a specific path (e.g., /favorites/:campsiteId).
favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        if (favorite.campsites.includes(req.params.campsiteId)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ message: 'Campsite is already in your favorites' });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ message: 'Campsite is not in your favorites' });
        }
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'Campsite is not in your favorites' });
      }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if (favorite) {
        if (!favorite.campsites.includes(req.params.campsiteId)) {
          favorite.campsites.push(req.params.campsiteId);
            favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch(err => next(err));
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
      } else {
        Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
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
  res.end('PUT operation not supported on /favorites/:campsiteId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        if (favorite) {
            // Find the index of the campsite in the user's favorites using the indexOf() method, which returns the index of the
            // specified campsite ID in the campsites array, or -1 if it's not found.
            const index = favorite.campsites.indexOf(req.params.campsiteId);
            if (index !== -1) {
                favorite.campsites.splice(index, 1); // Remove the campsite from the user's favorites using the splice() method, 
                // which removes the specified campsite ID from the array.
                // Save the updated favorite document to the database using the save() method, which persists the changes made to
                // the document in the MongoDB collection.
                favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch(err => next(err));
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ message: 'Campsite not found in your favorites' });
            }
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: 'No favorites found for this user' });
        }
    })
    .catch(err => next(err));
});

// Export the favoriteRouter for use in other parts of the application, allowing it to be mounted on a specific path in the
// main application file (e.g., /favorites or /favorites/:campsiteId). This enables the application to handle requests related to user 
// favorites in a modular and organized manner, separating the routing logic for favorites from other parts of the application.
module.exports = favoriteRouter;
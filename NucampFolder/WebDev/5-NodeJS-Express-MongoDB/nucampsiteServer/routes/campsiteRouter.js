/**
 * Testing the campsiteRouter.js file for the Nucamp server application.
 * 
 * Be sure to test your application using Postman while logged in as both an admin user, 
 * a regular non-admin user, and not logged in at all. Some of the tests you will want to try:
 * Confirm that while logged in as an admin user, you are able to post/put/delete to the /campsites 
 * and /campsites/:campsiteId/comments endpoints, and the same endpoints for promotions and partners. 
 * Confirm that you cannot as a regular user, or while not logged in.
 * Confirm that as an admin, you have access to DELETE all comments. 
 * Confirm that you cannot as a regular user, or while not logged in.
 * Confirm that as an admin, you can get a list of all user documents with a GET request to the /users 
 * path. Confirm that you cannot as a regular user, or while not logged in.
 * Confirm that as an admin or regular user, you are able to PUT or DELETE to a comment that you 
 * yourself submitted. You will first need to submit a comment while logged in for this, using a 
 * POST request from Postman. Then try to update or delete that same comment using its ID, 
 * while logged in with the same account. 
 * Confirm that you cannot update or delete that comment while not logged in, or logged into 
 * a different account.
 * The cors module is imported to handle Cross-Origin Resource Sharing (CORS) for the campsiteRouter.
 * Don't forget to use the cors middleware in the routes to enable CORS for specific origins based 
 * on the whitelist. Use ./ to indicate that the cors.js file is in the same directory as the campsiteRouter.js file.
 */

const express = require('express');
const Campsite = require('../models/campsite');
const authenticate = require('../authenticate');
const cors = require('./cors');
// The campsiteRouter is an instance of the Express Router, which allows us to define 
// routes for handling HTTP requests related to campsites. It is used to create 
// modular route handlers for the /campsites endpoint and its sub-routes.
// The campsiteRouter.route() method is used to define a route for the /campsites endpoint.
const campsiteRouter = express.Router();
/**
 * Set up admin-only access points.
 * Access levels across all campsite routes:
 *
 * /campsites
 *   GET    — public (no auth required)
 *   POST   — admin only  (verifyUser + verifyAdmin)
 *   PUT    — authenticated user (verifyUser); always returns 403 — method not supported
 *   DELETE — admin only  (verifyUser + verifyAdmin)
 *
 * /campsites/:campsiteId
 *   GET    — public
 *   POST   — authenticated user (verifyUser); always returns 403 — method not supported
 *   PUT    — admin only  (verifyUser + verifyAdmin)
 *   DELETE — admin only  (verifyUser + verifyAdmin)
 *
 * /campsites/:campsiteId/comments
 *   GET    — public
 *   POST   — authenticated user (verifyUser); any logged-in user may post a comment
 *   PUT    — authenticated user (verifyUser); always returns 403 — method not supported
 *   DELETE — admin only  (verifyUser + verifyAdmin); deletes ALL comments on a campsite
 *
 * /campsites/:campsiteId/comments/:commentId
 *   GET    — public
 *   POST   — authenticated user (verifyUser); always returns 403 — method not supported
 *   PUT    — authenticated user (verifyUser); any logged-in user may edit a comment
 *   DELETE — authenticated user (verifyUser); any logged-in user may delete a comment
 * 
 * @method campsiteRouter.route() - Defines a route for the /campsites endpoint and its sub-routes.
 * @param {string} path - The path for the route, which is /campsites in this case.
 * @returns {Object} - Returns the campsiteRouter instance for chaining route handlers.
 * @method .options() - Defines a route handler for the HTTP OPTIONS method, which is 
 *                      used to handle preflight requests for CORS. Preflight requests are sent by 
 *                      the browser to determine if the actual request is safe to send. A response
 *                      with a 200 OK status is sent to indicate that the request is allowed.
 * @param {Function} cors.corsWithOptions - Middleware function to handle CORS with custom options 
 *                                          based on the whitelist.
 * @param {Function} (req, res) => res.sendStatus(200) - Route handler that sends a 200 OK 
 *                   status for OPTIONS requests.
 * @method .get() - Defines a route handler for the HTTP GET method to retrieve all campsites.
 * @param {Function} cors.cors - Middleware function to handle CORS with default settings. GET requests 
 *                               are allowed from any origin, so the default CORS settings are used.
 * @param {Function} (req, res, next) => { ... } - Route handler that retrieves all campsites from the 
 *                                                 database and sends them in the response.
 * @method .post() - Defines a route handler for the HTTP POST method to create a new campsite.
 * @param {Function} cors.corsWithOptions - Middleware function to handle CORS with custom options based 
 *                                          on the whitelist. Used with POST, PUT and DELETE requests to allow 
 *                                          cross-origin requests from specific origins.
 * @param {Function} authenticate.verifyUser - Middleware function to verify that the user is authenticated.
 * @param {Function} authenticate.verifyAdmin - Middleware function to verify that the user has admin privileges.
 * @param {Function} (req, res, next) => { ... } - Route handler that creates a new campsite in the database 
 *                                                 and sends it in the response.
 * @method .put() - Defines a route handler for the HTTP PUT method to update all campsites (not supported).
 * @param {Function} (req, res) => { ... } - Route handler that sends a 403 Forbidden status for PUT requests 
 *                                           on /campsites.
 * @method .delete() - Defines a route handler for the HTTP DELETE method to delete all campsites.
 * @param {Function} (req, res, next) => { ... } - Route handler that .deletes all campsites from the database 
 *                                                 and sends the response.
 */
campsiteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Campsite.find()
    .populate('comments.author')
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
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res) => {
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
// The campsiteRouter.route() method is used to define a route for the /campsites/:campsiteId endpoint, which allows us to handle requests for a specific campsite identified by its unique ID. 
// The :campsiteId is a route parameter that can be accessed in the request object (req.params.campsiteId) 
// to perform operations on the specific campsite.

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
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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

campsiteRouter.route('/:campsiteId/comments')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        if (campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments);
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite) {
            req.body.author = req.user._id;
            campsite.comments.push(req.body);
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite) {
            /**
             * @note Mongoose 7+ removed the `.remove()` method on subdocuments.
             * Use `.deleteOne()` instead to remove a subdocument from its parent array.
             * `.remove()` will throw `TypeError: comment.remove is not a function` in Mongoose 7+.
             */
            for (let i = (campsite.comments.length-1); i >= 0; i--) {
                campsite.comments.id(campsite.comments[i]._id).deleteOne();
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

campsiteRouter.route('/:campsiteId/comments/:commentId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments.id(req.params.commentId));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
})
/**
 * Updating/deleting comments.
 * PUT and DELETE on a specific comment are restricted to the comment's author.
 * verifyUser authenticates the request and loads req.user.
 * Inside the handler, req.user._id is compared to comment.author.
 * If they do not match, a 403 Forbidden error is returned.
 * 
 * Did not use verifyAdmin here because we want to allow any authenticated user to 
 * update/delete their own comments, not just admins.
 * 
 * Since PUT is a mutating operation, we need to check if the logged-in user is the author 
 * of the comment before allowing the update, so cors.corsWithOptions is used to handle 
 * CORS for the PUT request, and the verifyUser middleware is used to authenticate the user.
 * Once the user is authenticated, findById() is used to find the campsite by its ID, and 
 * then the comment is retrieved using the comment's ID.
 * 
 * @note Mongoose 7+ removed the `.remove()` method on subdocuments.
 * Use `.deleteOne()` instead to remove a subdocument from its parent array.
 * `.remove()` will throw `TypeError: comment.remove is not a function` in Mongoose 7+.
 */
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            /** 
             * Only allow the comment's author to update it. 
             * Uses Mongoose's safe ObjectId comparison method, .equals(), to compare the logged-in 
             * user's ID (req.user._id) with the comment's author ID (comment.author).
             * If they match, the comment is updated; if not, a 403 Forbidden error is returned.
             * This ensures that only the author of a comment can modify it.
             */
            const comment = campsite.comments.id(req.params.commentId);
            if (comment.author.equals(req.user._id)) {
                if (req.body.rating) {
                    comment.rating = req.body.rating;
                }
                if (req.body.text) {
                    comment.text = req.body.text;
                }
                campsite.save()
                .then(campsite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite);
                })
                .catch(err => next(err));
            } else {
                const err = new Error('You are not authorized to update this comment!');
                err.status = 403;
                return next(err);
            }
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
/**
 * Did not use verifyAdmin here because we want to allow any authenticated user to delete 
 * their own comments, not just admins.
 */
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            /** Only allow the comment's author to delete it. */
            const comment = campsite.comments.id(req.params.commentId);
            if (comment.author.equals(req.user._id)) {
                /**
                 * @note Mongoose 7+ removed the `.remove()` method on subdocuments.
                 * Use `.deleteOne()` instead to remove a subdocument from its parent array.
                 * `.remove()` will throw `TypeError: comment.remove is not a function` in Mongoose 7+.
                 */
                comment.deleteOne();
                campsite.save()
                .then(campsite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite);
                })
                .catch(err => next(err));
            } else {
                const err = new Error('You are not authorized to delete this comment!');
                err.status = 403;
                return next(err);
            }
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

module.exports = campsiteRouter;
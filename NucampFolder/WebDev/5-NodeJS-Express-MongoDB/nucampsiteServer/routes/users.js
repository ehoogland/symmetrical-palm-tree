const express = require('express');
const User = require('../models/user');
const passport = require('passport');
// Import the authenticate module to access the getToken function for generating JWTs
const authenticate = require('../authenticate');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * @route POST /users/signup
 * @description Registers a new user. Uses passport-local-mongoose's register() method,
 * which hashes the password and stores the user in the database. Returns an error if
 * the username already exists.
 * @param {string} req.body.username - The desired username.
 * @param {string} req.body.password - The desired password.
 * @param {string} [req.body.firstname] - Optional first name.
 * @param {string} [req.body.lastname] - Optional last name.
 */
router.post('/signup', (req, res) => {
    /** Register the new user. register() is provided by passport-local-mongoose and
     * returns a Promise, so we use .then()/.catch() for async handling. */
    User.register(new User({username: req.body.username}), req.body.password)
    /** Update optional profile fields, then save the user document. */
    .then(user => {
        if (req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        return user.save();
    })
    /** Authenticate with the local strategy (session: false since we use JWTs)
     * and return a success response. */
    .then(() => {
        passport.authenticate('local', {session: false})(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
        });
    })
    /** Handle any errors during registration (e.g. duplicate username). */
    .catch(err => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
    });
});

/**
 * @route POST /users/login
 * @description Authenticates a user with the local strategy and returns a signed JWT.
 * session: false is used because this app uses token-based (JWT) authentication,
 * not server-side sessions.
 * @param {string} req.body.username - The user's username.
 * @param {string} req.body.password - The user's password.
 * @returns {Object} JSON containing success, token, and status message.
 */
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

/**
 * @route GET /users/logout
 * @description Destroys the user's session and clears the session cookie.
 * If no session exists, responds with a 401 error.
 */
router.get('/logout', (req, res, next) => {
 if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }
});

module.exports = router;
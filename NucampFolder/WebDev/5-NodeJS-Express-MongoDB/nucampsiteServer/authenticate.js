const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Strategy for local authentication
const User = require('./models/user');
/**
 * Configure Passport to use the local strategy for authentication. 
 * The local strategy uses a username and password for authentication. 
 * The User model is used to authenticate users, serialize user information 
 * into the session, and deserialize user information from the session.
 * @method local
 * @memberof module:authenticate
 * @param {Object} User - The User model used for authentication.
 * @returns {void}
 * @method serializeUser
 * @memberof module:authenticate
 * @param {Object} user - The user object to be serialized. Serialized user information 
 * is stored in the session. Serialized means that the user information is converted 
 * into a format that can be stored in the session.
 * @returns {void}
 * @method deserializeUser
 * @memberof module:authenticate
 * @param {Object} id - The user ID to be deserialized. Deserialized user information 
 * is retrieved from the session. Deserialized means that the user information is converted 
 * back into its original format.

 * @returns {void}  
 */
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

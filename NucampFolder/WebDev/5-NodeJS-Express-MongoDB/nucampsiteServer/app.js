/**
 * @file app.js
 * @description This file sets up the Express application, connects to the MongoDB database using Mongoose, 
 * and configures middleware for logging, parsing JSON and URL-encoded data, handling cookies, and 
 * authentication using Passport. It also defines routes for handling requests to different resources, 
 * such as users, campsites, promotions, and partners.
 * @module app
 * @requires express
 * @requires path
 * @var createError - The http-errors module is used to create HTTP error objects for handling errors in the application.
 * @var express - The Express module is used to create the Express application and define routes and middleware.
 * @var path - The path module is used to work with file and directory paths.
 * @var logger - The morgan module is used for logging HTTP requests to the console.
 * @var passport - The passport module is used for authentication in the Express application.
 * @var config - The config module is used to import configuration settings from the config.js file.
 * @var indexRouter - The router for handling requests to the index route.
 * @var usersRouter - The router for handling requests to the users route.
 * @var campsiteRouter - The router for handling requests to the campsites resource.
 * @var promotionRouter - The router for handling requests to the promotions resource.
 * @var partnerRouter - The router for handling requests to the partners resource.
 * @var mongoose - The mongoose module is used to connect the Express server to a MongoDB database and 
 *                 define data models.
 * @var url - The connection string for the MongoDB database, specifying the protocol, host, port, 
 *            and database name.
 * @var connect - The promise returned by calling mongoose.connect() with the url and an empty options object.
 * @var app - The Express application object created using the express() function.
 * @var __dirname - A Node.js global variable that represents the directory name of the current module.
 * @var next - The next middleware function in the stack, which is called to pass control to the next 
 *             middleware function or route handler.
 * @var req - The request object, which contains information about the incoming HTTP request, such as headers, 
 *            query parameters, and the request body.
 * @var res - The response object, which is used to send the HTTP response back to the client, and contains 
 *            methods for setting headers, status codes, and sending the response body.
 */
/**
 * @description The http-errors module is used to create HTTP error objects for handling errors in the application.
 * @module createError
 * @requires http-errors
 */
var createError = require('http-errors');
var express = require('express');
/**
 * @description path module is used to work with file and directory paths. It provides utilities 
 * for handling and transforming file paths, making it easier to work with file system paths 
 * in a cross-platform manner.
 * @module path
 * @requires path
 */
var path = require('path');
/**
 * @var logger - The morgan module is used for logging HTTP requests to the console. It provides a simple and 
 * configurable way to log request details, such as the request method, URL, status code, and response time. 
 * This helps in monitoring and debugging the application by providing insights into incoming requests and 
 * their outcomes.
 * @module logger
 * @requires morgan
 */
var logger = require('morgan');
/**
 * @description The passport module is used for authentication in the Express application.
 * It provides a simple and consistent API for handling authentication strategies, such as local authentication, 
 * OAuth, and OpenID. In this application, passport is used to authenticate users during login and manage user sessions.
 * @module passport
 * @requires passport
 */
const passport = require('passport');
/**
 * @description The config module is used to import the configuration settings from the config.js file.
 * The config object contains the secret key used for signing JSON Web Tokens (JWTs) and the MongoDB 
 * connection URL. These settings are used throughout the application for authentication and database 
 * connection purposes.
 * @module config
 * @requires ./config
 */
const config = require('./config');
/**
 * @description indexRouter and usersRouter are imported from the routes directory. These routers 
 * handle requests for the index and users routes, respectively.
 * @module indexRouter
 * @module usersRouter
 * @requires ./routes/index
 * @requires ./routes/users
 * @exports indexRouter - The router for handling requests to the index route.
 * @exports usersRouter - The router for handling requests to the users route.
 * The routers are mounted on their respective paths using app.use() in the 
 * Express application, allowing the application to handle requests for these 
 * routes and delegate them to the appropriate router.
 * 
 * Don't forget to prepend the routers with ./ to indicate that they are local modules 
 * in the same directory as app.js.
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/** 
 * @general In MongoDB, @database {string} is a container that holds a set of data collections.
 * @collection {string} In MongoDB, a collection is a grouping of documents within a database 
 *             (that is, within a set of [data] collections).
 * @document {Object} In MongoDB, a document is a single record in a collection, represented as 
 *           a JSON-like object, which can contain nested fields and arrays.
 * @format BSON (Binary JSON) format for each document in a collection.
 * @identifier Each document has a unique identifier (_id) and can have different fields and data types.
 */
/**
 * @note As a part of implementing a REST (Representational State Transfer) API, 
 *       create separate routers for each resource (campsites, promotions, and partners). 
 * @description The campsiteRouter, promotionRouter, and partnerRouter are imported from 
 * the routes directory. These routers handle requests for the campsites, promotions, and 
 * partners resources, respectively.
 * @modules campsiteRouter, promotionRouter, partnerRouter
 * These modules organize code better and handle requests for each resource in its own router file.
 */
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');
/**
 * Connect Express server to MongoDB/Mongoose
 * @description The mongoose module is used to connect the Express server to a MongoDB database.
 * It provides a straightforward, schema-based solution to model application data and includes 
 * built-in type casting, validation, query building, and business logic hooks. In this application, 
 * mongoose is used to connect to the MongoDB database, define schemas for the data models, and 
 * perform CRUD (create-read-update-delete) operations on the database.
 * @module mongoose
 * @requires mongoose
 * @exports mongoose - The mongoose module for connecting to MongoDB and defining data models.
 * @method mongoose.connect() method is used to establish a connection to the MongoDB database, 
 * and the connection is handled using promises. If the connection is successful, a message is 
 * logged to the console. If there is an error, the error is logged to the console. 
 * @const @var connect variable is assigned the promise returned by calling mongoose.connect() with the url 
 * and an empty options object.
 * @param {string} url - The connection string for the MongoDB database, specifying the protocol, host, port, 
 * and database name.
 * @port {number} 27017 - The default port number for MongoDB connections.
 * @param {string} nucampsite - The name of the MongoDB database to connect to. 
 * @param {Object} options - An empty options object passed to mongoose.connect().
 * @returns {Promise} A promise that resolves when the connection to the MongoDB database is successful, 
 * or rejects with an error if the connection fails.
 * @throws {Error} If there is an error connecting to the MongoDB database, an error is thrown.
 * @param {function} then() - A method called on the connect promise to handle successful connection to the MongoDB database.
 * @param {function} catch() - A method called on the connect promise to handle errors that occur while trying to connect 
 * to the MongoDB database.
 * @param {function} console.log() - log messages to the console that indicate if the connection was successful or if an error occurred.
 * @param {function} console.error() - log error messages to the console if an error occurs while trying to connect to the MongoDB database.
 * @throws {Error} If there is an error connecting to the MongoDB database, an error is thrown.
 * @returns {void} The function does not return a value, but it either logs a success message to the console
 * or logs an error message to the console if the connection fails.
 */
const mongoose = require('mongoose');

const url = config.mongoUrl; 
/**
 * Previously, mongoose.connect() was called with an options object:
 *   { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }
 * These options are no longer supported in Mongoose 6+ / MongoDB driver 4+:
 *   - useNewUrlParser and useUnifiedTopology are enabled by default and the options were removed.
 *   - useCreateIndex and useFindAndModify were Mongoose-specific shims for deprecated MongoDB driver
 *     behaviours; they were removed in Mongoose 6 because the underlying driver no longer supports them.
 * Passing any of these options now throws a MongoParseError at startup, so the options object is omitted.
 */
const connect = mongoose.connect(url);
/** Handle the promise returned by calling mongoose's connect method (return value gets assigned/bound 
 * to the constant variable connect) */
connect.then(() => console.log('Connected correctly to server'),
err => console.log(err) 
);
/** this is another way to handle errors besides catch, especially when 
it is the last "then" */
/** 
 * Create a new Express application
 * The express() function creates an Express application, which is an object that has methods for 
 * routing HTTP requests, configuring middleware, rendering HTML views, and registering a template engine.
*/
var app = express();
/** 
 * View engine setup
 * @description Set the views directory and view engine for rendering templates
 * @dir The views directory is set to the 'views' folder in the root directory of the application, 
 * and the view engine is set to 'pug', which is a template engine for rendering dynamic HTML pages.
 * @method app.set() method is used to set application-level settings, such as the views directory 
 * and view engine.
 * @param {string} 'views' - The name of the setting to configure, which is the views directory.
 * @param {string} 'view engine' - The name of the setting to configure, which is the view engine.
 * @param {string} 'pug' - The name of the template engine to use for rendering dynamic HTML pages.
 * @param {string} path.join(__dirname, 'views') - The absolute path to the views directory, constructed using the path.join() method and the __dirname global variable.
 * @global @variable __dirname is a Node.js global variable that represents the directory name of the current module. 
 * It is used here to construct the absolute path to the 'views' directory, ensuring that the 
 * application can locate the views folder regardless of where it is executed from.
 * @method path.join() method is used to create a cross-platform compatible path to the views directory, 
 * ensuring that the application works correctly on different operating systems.
 * @returns {string} The absolute path to the views directory, which is used by the Express application to locate and render templates.
 * @note The views directory is where the template files (e.g., .pug files) are stored, and the view engine is responsible for rendering these templates into HTML pages that can be sent to the client.
 * @note The view engine 'jade' has been renamed to 'pug' in later versions, but it is still commonly referred to as 'jade' in many applications.
 * @note The app.set() method is used to configure application-level settings, and it can be called multiple times to set different settings. In this case, it is called
 * @engine pug is a template engine for rendering dynamic HTML pages.
 * @method path.join() method is used to create a cross-platform compatible path to the views directory, 
 * ensuring that the application works correctly on different operating systems.
 * @global @variable __dirname is a Node.js global variable that represents the directory name of the current module. 
 * It is used here to construct the absolute path to the 'views' directory, ensuring that the 
 * application can locate the views folder regardless of where it is executed from.
 * @method app.set() method is used to set application-level settings, such as the views directory 
 * and view engine.
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// command-shift-n to open a private window in Chrome, then go to http://127.0.0.1:3000 to see the app running
/** 
 * Use middleware for logging, parsing JSON and URL-encoded data, and handling cookies
 * The app.use() method is used to mount middleware functions that will be executed for every incoming request.
 * The logger middleware logs HTTP requests to the console, providing information about the request method, URL, status code, and response time.
 * The express.json() middleware parses incoming JSON payloads and makes the data available in req.body.
 * The express.urlencoded() middleware parses incoming URL-encoded payloads and makes the data available in req.body.
 * The cookieParser() middleware parses cookies attached to the client request object and makes them available in req.cookies.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/**
 * There can be conflicts between the cookieParser() middleware and the express-session middleware, as both can handle cookies.
 * The cookieParser() middleware is used to parse cookies attached to the client request object, while the express-session middleware is used to manage session data and store it in a cookie.
 * If both middlewares are used together, the cookieParser() middleware may interfere with the session management of express-session, leading to unexpected behavior or errors.
 * To avoid conflicts, it is recommended to use only one of these middlewares in an application. 
 * If you need to manage sessions, use express-session and avoid using cookieParser(). 
 * If you only need to parse cookies, use cookieParser() and avoid using express-session().
 * 
 * @description The cookieParser() middleware is used to parse cookies attached to the client request object.
 *              It takes an optional secret key as an argument, which is used to sign the cookies for added security. 
 *              In this case, the secret key is set to '12345-67890-09876-54321'. Any cookies sent by the client 
 *              will be signed with a hashed value of this key, and the server will verify the hashed value, 
 *              or signature, when reading the cookies. If the signature does not match, it indicates that the 
 *              cookie has been tampered with, and the server will reject it.  
 * @function cookieParser() - The cookieParser() middleware is used to parse cookies, which get attached to the 
 *              client request object. The function takes an optional secret key as a parameter. 
 * @param {string} secret - The secret key used to sign the cookies. The key is used when added security is needed.
 *              The secret key is a string that is used to generate a hash of the cookie value, and this hash is referred to 
 *              as the signature. The hash is appended to the cookie value, and when the server receives the cookie, it 
 *              verifies the signature using the same secret key. The signature can also be verified later to ensure 
 *              that the cookie has not been tampered with.
 * @returns @Object req.cookies - The parsed cookies are made available in the req.cookies object. 
 *              This object contains key-value pairs of cookie names and their corresponding values.
 * 
 * Note: Not used in this application, but if you want to use signed cookies, you can uncomment the following 
 * line and provide a secret key for signing cookies.
 * app.use(cookieParser('12345-67890-09876-54321')); // secret key for signing cookies
 */
/** 
 * @description:
 * @function auth is a middleware function that checks if the user is authenticated before allowing access 
 * to certain routes. If the user is not authenticated, it will respond with an error or redirect them to a login page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void} - The function does not return a value, but it either calls the next middleware
 * in the stack or sends an error response if the user is not authenticated.
 * @constant authHeader - The 'authorization' header from the request, which contains the 
 * base64-encoded credentials. It is used to check if the user has provided authentication 
 * credentials. A typical 'authorization' header looks like this: 'Basic dXNlcm5hbWUOncGFzc3dvcmQ=', 
 * where 'dXNlcm5hbWU6cGFzc3dvcmQ=' is the base64-encoded string of 'username:password'. The decoded
 * credentials username:passwordare then split into an array containing the username and password.
 * @array @function auth - The decoded credentials, split into an array containing the username and 
 * password.
 * @constant user - The username extracted from the decoded credentials. 
 * Index 0 of the auth array contains the username, which is used to verify if the user is authorized to access 
 * the requested resource. 
 * @constant pass - The password extracted from the decoded credentials. Index 1 of the auth array contains 
 * the password, which is used to verify the user's identity. The username and password are compared against 
 * predefined values (in this case, 'admin' and 'password') to determine if the user is authenticated.
 * @constant err - An error object created when the user is not authenticated.
 * @method err.status - Sets the status code of the error object to 401 (Unauthorized).
 * @method res.setHeader() - Sets the 'WWW-Authenticate' header in the response to indicate that
 * the client must provide authentication credentials.
 * @return @method next() - Passes control to the next middleware function in the stack, 
 * which can be an error handler or another middleware function.
 * @return @method next(err) - Passes the error object to the next middleware function in the stack, an error handler
*/
/**
 * @Note Added detailed JSDoc comments to the auth middleware function relating to cookies. There are also detailed comments for the 
 * req, res, and next parameters, as well as the signedCookies and user properties of the req object.
 * @description The auth middleware function checks if the user is authenticated by verifying the presence of a signed cookie named 'user'.
 * If the signed cookie is not present, it checks for the 'authorization' header in the request. 
 * If the header is missing, it creates an error and sets the 'WWW-Authenticate' header to prompt the client for credentials.
 * If the 'authorization' header is present, it decodes the base64-encoded credentials, splits them into username and password, 
 * and checks if they match predefined values ('admin' and 'password').
 * If the credentials are correct, it sets a signed cookie named 'user' with the value 'admin' and calls the next middleware function. 
 * If the credentials are incorrect, it creates an error and sets the 'WWW-Authenticate' header.
 * If the signed cookie is present, it creates an error indicating that the user is not authenticated and passes it to the next 
 * middleware function.
 * @Object @function auth - The authentication middleware function that checks if the user is authenticated before allowing access 
 * to certain routes.
 * @Object @method req - The request object, which contains information about the incoming HTTP request, such as headers, query parameters, and the request body.
 * @Object @method res - The response object, which is used to send the HTTP response back to the client, and contains methods for setting headers, status codes, and sending the response body.
 * @Object @method next - The next middleware function in the stack, which is called to pass control to the next middleware function or route handler. If there are no more middleware functions, it will pass control to the error handler.
 * @Object @method signedCookies - An object containing the signed cookies sent by the client. It is used to check whether the 'user' 
 * signed cookie is present, which indicates that the user is authenticated.
 * @Object @method user - The 'user' signed cookie, which contains the username of the authenticated user.
*/

/**
 * @description The passport.initialize() middleware is used to initialize Passport for 
 * authentication in the Express application. 
 */ 
app.use(passport.initialize());

/**
 * @description The routers for the index and users routes are mounted on their respective paths.
 * The app.use() method is used to mount the routers for different resources on their respective paths.
 * The indexRouter is mounted on the root path ('/'), and the usersRouter is mounted on the '/users' path.
 * This allows the application to handle requests for these routes and delegate them to the appropriate router.
 * @method app.use() method is used to mount middleware functions that will be executed for every incoming request.
 * @param {string} '/' - The root path for the indexRouter, which handles requests to the home page of the application.
 * @param {string} '/users' - The path for the usersRouter, which handles requests related to user management, such as signup and login.  
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * @description @function express.static is used to serve static files, such as images, CSS files, and 
 * JavaScript files from the 'public' directory. This allows clients to access these files directly via 
 * their URLs.
 * @function @method path.join() is used to create a cross-platform compatible path to the 'public' directory, 
 * ensuring that the application works correctly on different operating systems.
 * @param {string} __dirname - A Node.js global variable that represents the directory name of the current module.
 * @param {string} 'public' - The name of the directory containing static files to be served.
*/
app.use(express.static(path.join(__dirname, 'public')));

/** 
 * @description The imported routers for campsites, promotions, and partners are mounted on their respective paths.
 * @method app.use() method is used to mount the routers for different resources on their respective paths.
 */
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

/** 
 * @description Catch 404 and forward to error handler
 * @function app.use() method is used to define a middleware function that handles requests that do not match 
 * any of the defined routes.
 * @param {Object} req - The request object. An instance of the http.IncomingMessage class, which represents the HTTP request and contains information
 * about the request, such as headers, query parameters, and the request body.
 * @param {Object} res - The response object. An instance of the http.ServerResponse class, which is used to send the HTTP response back to the client, 
 * and contains methods for setting headers, status codes, and sending the response body.
 * @param {Function} next - The next middleware function in the stack. A function that, when called, passes control to the next middleware function in the stack. 
 * If there are no more middleware functions, it will pass control to the error handler. Unlike req and res, next is not an instance of a class, 
 * but rather a function that is provided by the Express framework to facilitate the flow of control through the middleware stack. It is only required
 * when defining middleware functions that need to pass control to the next function in the stack, such as error handling middleware. req and res
 * are always required parameters for middleware functions, as they represent the incoming request and outgoing response, respectively.
 * @function next(createError(404)) - This function is called with @param createError to create a 
 * new error object with a status code of 404 (Not Found).
 * @returns {void} - The function does not return a value, but it either calls the next middleware in the stack 
 * or sends an error response if the route is not found.
 */
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
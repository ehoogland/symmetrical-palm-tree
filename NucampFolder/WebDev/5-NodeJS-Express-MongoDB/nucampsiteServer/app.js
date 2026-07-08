var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// Connect Express Server to MongoDB/Mongoose
const mongoose = require('mongoose');
// Give it the url in order to connect to MongoDB/Mongoose server, and
// use defaults ( {} ), save to connect variable
const url = 'mongodb://127.0.0.1:27017/nucampsite';
const connect = mongoose.connect(url, {});
// Handle the promise returned by  calling mongoose's connect method (return value gets assigned/bound to the constant variable connect
connect.then(() => console.log('Connected correctly to server'),
err => console.log(err) // this is another way to handle errors besides catch, especially when it is the last "then"
);
// To implement a RESTful API, create separate routers for each resource (campsites, promotions, and partners). 
// This organizes our code better and handle requests for each resource in its own router file.
// Import routers for different resources from public/routes directory, having already copied
// the router files from the node-express/routes directory (or the server/routes directory) to the public/routes directory.
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

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
 * and the view engine is set to 'pug'
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
app.use(cookieParser());

/**
 * @note Setting up authentication middleware for the application
 * Because the authentication middleware is placed before the static file serving middleware 
 * [ app.use(express.static(path.join(__dirname, 'public'))); ], it will be executed for every 
 * incoming request before any static files are served. Placing the authentication middleware 
 * before the static file serving middleware ensures that all requests, including those for 
 * static files, are subject to authentication checks. This is important for protecting 
 * sensitive resources and ensuring that only authenticated users can access them.
 * If the authentication middleware were placed after the static file serving middleware, 
 * requests for static files would bypass the authentication checks, potentially exposing 
 * sensitive resources to unauthenticated users.
 */  
/** 
 * @description:
 * @function auth is a middleware function that checks if the user is 
 * authenticated before allowing access to certain routes. If the user is not authenticated, 
 * it will respond with an error or redirect them to a login page.
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
 * @method next() - Passes control to the next middleware function in the stack, 
 * which can be an error handler or another middleware function.
 */
function auth(req, res, next) { 
  console.log(req.headers);
  // Check if the request has an 'authorization' header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // If the 'authorization' header is missing, create an error and set the 'WWW-Authenticate' header
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401; // Unauthorized status code
    return next(err); // Pass the error to the next middleware (error handler)
  }
  /**
   * @description - The 'authorization' header contains the base64-encoded credentials in the 
   * format 'username:password'.
   * @global Buffer - Node.js global object for handling binary data. These globals are rare 
   * in Node.js, but they are used here to decode the base64-encoded credentials.
   * @function Buffer.from() - from() is a static method of the Buffer class that creates a new buffer 
   * containing the specified data. In this case, itcreates a new buffer from the base64-encoded string. 
   * @method toString() - JavaScript method that converts the buffer to a string
   * @method split(':') - JavaScript method that splits the string into an array of two elements: username and password
   * If the 'authorization' header is present, decode the base64-encoded credentials
   * The credentials are in the format 'username:password', so we split them into user and pass
   * The Buffer.from() method is used to create a new buffer from the base64-encoded string,
   * and the toString() method is used to convert the buffer to a string. The split(':') method 
   * is then used to separate the username and password.
   */
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];
  if (user === 'admin' && pass === 'password') {
    // If the username and password are correct, call the next middleware function
    return next(); // authorized, proceed to the next middleware or route handler
  }
  else {
    // If the username and password are incorrect, create an error and set the 'WWW-Authenticate' header
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401; // Unauthorized status code
    return next(err); // Pass the error to the next middleware (error handler)
  }
}

app.use(auth); // Use the auth middleware for all routes
/** 
 * @description @function authenticate is imported from the 'authenticate' module and is used as 
 * middleware to protect routes that require authentication. It checks whether the user is authenticated before 
 * allowing access to certain routes. If the user is not authenticated, it will respond with an error or 
 * redirect them to a login page.
 */
// const authenticate = require('./authenticate');
// app.use(authenticate);
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
 * @description indexRouter is mounted on the root path ('/'), and usersRouter is mounted on the '/users' path.
 * The app.use() method is used to mount the routers for different resources on their respective paths.
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

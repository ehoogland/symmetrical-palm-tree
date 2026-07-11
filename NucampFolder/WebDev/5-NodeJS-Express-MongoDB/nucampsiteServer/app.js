var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Add session support to the Express application by importing the express-session 
// and session-file-store modules.
const session = require('express-session');
/** 
 * The session-file-store module is a session store for Express that uses the file system 
 * to store session data. 
 * There are two sets of parameters here: one for the session-file-store module itself, 
 * and one for the session object.
 * The entire function is returning another function as its return value, then the returned 
 * function is called with the session object as its argument, which then returns a constructor
 * function that can be used to create a new instance of the session store.
 */
const FileStore = require('session-file-store')(session);

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
 * @description The session middleware is used to manage user sessions in the Express application. 
 * It creates a session for each user and stores session data on the server side. 
 * The session ID is stored in a cookie on the client side, which is sent with each request 
 * to identify the user's session. The session middleware is configured with options such as the name 
 * of the session ID cookie, a secret key for signing the cookie, and a file store for storing session 
 * data on the server side.
 * @name - The name of the session ID cookie is set to 'session-id', which is the name of the cookie that will be sent 
 *        to the client and used to identify the user's session.
 * @secret - The secret option is set to a string value, which is used to sign the session ID cookie. 
 *        This helps prevent tampering with the cookie and ensures that the session data is secure.
 * @resave - The resave option is set to false, which means that the session will not be saved back 
 *        to the session store if it hasn't been modified during the request. It will mainly help to keep the 
 *        session marked as active.
 * @saveUninitialized - The saveUninitialized option is set to false, which means that a session will not be 
 *        created and saved to the session store unless it has been modified. This helps reduce the number of 
 *        empty sessions stored in the session store.
 * @store - The store option is set to a new instance of FileStore, which is a session store that uses the 
 *          file system to store session data. This allows session data to persist across server restarts 
 *          and provides a simple way to manage sessions without requiring a separate database.
*/
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
/** 
 * The session middleware will automatically add a property called session to the request message, 
 * which is an object that contains the session data for the current user. Adding a console.log during 
 * development can help debug session-related issues.
 * @constant session - The session object containing the session data for the current user.
 * @method console.log() - Logs the session object to the console for debugging purposes.
*/

function auth(req, res, next) {
  console.log(req.session);  
  if (!req.session.user) { // Check whether the 'user' property is not present in the session object
    const authHeader = req.headers.authorization; // Get the 'authorization' header from the request
  /** 
   * Used in cookie parser: if (!req.signedCookies.user) { // Check whether the 'user' signed cookie 
   * is not present
   */
    if (!authHeader) { 
      /** If the 'authorization' header is missing, create an error and set the 'WWW-Authenticate' header */
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      /** Pass the error to the next middleware, i.e., the error handler */
      return next(err); 
    }
    /**
     * @description - The 'authorization' header contains the base64-encoded credentials in the 
     * format 'username:password'.
     * @global @object Buffer - Node.js global object for handling binary data. Global objects are rare 
     * in Node.js, but they are used here to decode the base64-encoded credentials.
     * @header authHeader - The 'authorization' header from the request, which contains the base64-encoded credentials.
     * @function Buffer.from(..., 'base64') - from() is a static method of the Buffer class that creates a new buffer 
     * containing the specified data. The ... represents the base64-encoded string, and the 'base64' argument specifies 
     * the encoding of the input string. In this case, '...' is authHeader.split(' ')[1]. The base64 encoded string
     * ia represented in memory as a buffer, which is a temporary storage area for binary data. The Buffer.from() method is 
     * used to create a new buffer containing raw binary data from the encoded string, which in this case is base64-encoded, 
     * allowing us to decode it into its original form.
     * @method split with @param ' ' in parentheses- JavaScript method that splits the 'authorization' header string 
     * into an array of two elements: the authentication scheme (e.g., 'Basic') and the base64-encoded credentials, 
     * separated by a delimiter of blank space, indicated by the @parameter ' '. The resulting array is 
     * then accessed at index 1 of the zero-indexed array, using [1] to get the base64-encoded credentials and not the 
     * encoding scheme. The base64-encoded credentials are then passed to the Buffer.from() method for decoding. 
     * @param (...) - The base64-encoded string extracted from the 'authorization' header. It is the second element of the 
     * array returned by the split(' ') method, which splits the 'authorization' header into two parts: the authentication 
     * scheme (e.g., 'Basic') and the base64-encoded credentials.
     * @param base64 - A string that specifies the encoding of the input string. In this case, it indicates that the input string is
     * base64-encoded, allowing the Buffer.from() method to correctly decode it into its original form.
     * @method toString() - JavaScript method that converts the buffer loaded in to memory using Node.js to a string. 
     * It is used here to convert the base64-decoded buffer into a string representation of the credentials.
     * @method split(':') - JavaScript method that splits the string into an array of two elements: 
     * username and password, separated by a delimiter. In this case, the delimiter is a colon (':'), which separates the username 
     * and password.
     * The resulting array is then destructured into the @constant user and @constant pass variables, 
     * which are used to verify the user's credentials.
     * @constant auth - An array containing the username and password extracted from the decoded credentials.
     * @constant user - The username extracted from the decoded credentials.
     * @constant pass - The password extracted from the decoded credentials.
     * @returns {Array} - An array containing the username and password separated by a colon. 
     * These values are then destructured into the @constant user and @constant pass.
     * If the 'authorization' header is present, decode the base64-encoded credentials
     * The credentials are in the format 'username:password', so we split them into user and pass
     * The Buffer.from() method is used to create a new buffer from the base64-encoded string,
     * and the toString() method is used to convert the buffer to a string. The split(':') method 
     * is then used to separate the username and password.
    */
   const auth = Buffer.from(authHeader.split(' ')[1], 'base64')
   .toString()
   .split(':');
   const user = auth[0];
   const pass = auth[1];
   /**
    * @description If the username and password are correct, set the 'user' property in the session object 
    * to 'admin'. This indicates that the user is authenticated and allows access to protected routes.
    * @property req.session.user - The 'user' property in the session object is set to 'admin', indicating 
    * that the user is authenticated.
    */
   if (user === 'admin' && pass === 'password') {
     req.session.user = 'admin';
     /** 
      * @description The following line of code is commented out because it is not used in this application.
      * It is an example of how to set a signed cookie named 'user' with the value 'admin' using the res.cookie() method.
      * The app is currently using session management with express-session, so the signed cookie is not needed.
      * The former code is from the previous version of the application that used cookie-based authentication 
      * instead of session-based authentication.
      * Set a signed cookie named 'user' with the value 'admin'. If the username and password are correct, 
      * call the next middleware function
      * 
      * res.cookie('user', 'admin', { signed: true }); 
     */ 
     return next(); // authorized >> proceed to the next middleware or route handler
    } else {
      /**
       * @constant err - An error object created when the user is not authenticated. It contains a message and a status code.
       * @description If the username and password are incorrect, create an error and set the 'WWW-Authenticate' header 
       * to prompt the client for credentials. The error object is then passed to the next middleware (error handler).
       * @method setHeader Set the 'WWW-Authenticate' header on the response object to prompt the 
       *                   client for credentials
       * @param {string} 'WWW-Authenticate' - The name of the header to be set on the response object.
       * @param {string} 'Basic' - The value of the 'WWW-Authenticate' header, indicating that the client 
       *                          should use Basic authentication to provide credentials.
       * @method err.status Unauthorized status code 401 is set to the error object to indicate 
       *                    that the user is not authenticated.
       * @return @function next(err) Pass the error to the next middleware (error handler)
       * @param {Object} err - The error object created when the user is not authenticated. 
       *                        It contains a message and a status code.
       * @param {number} err.status - The status code of the error object, set to 401 (Unauthorized).
       * 
       */
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic'); 
      err.status = 401; 
      return next(err); 
    }
  } else {
            if (req.session.user === 'admin') {
            return next();
        } else {
            const err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        }
    }
} 
    /**  
     * this 'if' block was missing and gave a 401 error when 
     * trying to access the /campsites route after logging in with the correct credentials.
     * It checks whether the 'user' signed cookie is present and has the value 'admin' 
     * 
     * if (req.signedCookies.user === 'admin') { return next(); }
     * replaced above by if (req.session.user === 'admin') { return next(); } to use session management 
     * instead of signed cookies
     * 
     */
   
    
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

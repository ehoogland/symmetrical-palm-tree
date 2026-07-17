const cors = require('cors');
/**
 * @description This module provides CORS (Cross-Origin Resource Sharing) 
 *              configuration for the application.
 *              It defines a whitelist of allowed origins and a delegate function 
 *              to determine the CORS options based on the request's origin.
 *              The module exports two middleware functions: `cors` for enabling CORS 
 *              with default settings, and `corsWithOptions` for enabling CORS 
 *              with custom options based on the whitelist.
 * @module cors 
 * @requires cors
 * @const whitelist An array of allowed origins for cross-origin requests.
 * @function @const corsOptionsDelegate A function expression that determines the CORS 
 *                                      options based on the request's origin.
 * @param {Object} req - The HTTP request object.
 * @method callback(null, corsOptions) - A method to invoke the callback function with the determined CORS options.
 * @throws {Error} If the request's origin is not in the whitelist, CORS is disabled for that origin.
 * @note The `cors` middleware is used to enable CORS for all routes in the application, 
 *       while `corsWithOptions` is used to enable CORS with custom options based on the whitelist.
 * @let corsOptions - variable declaration. Will bind to an object that holds the CORS options for the request.
 * @description The `corsOptionsDelegate` function checks if the request's origin is in the 
 *              whitelist. If it is, CORS is enabled for that origin; otherwise, CORS is disabled.
 * @method req.header('Origin') - A method to retrieve the value of the 'Origin' header from the request.
 * @method whitelist.indexOf(req.header('Origin')) - A method to check if the request's origin is in the whitelist.
 * @returns -1 if the origin is not found in the whitelist, indicating that CORS should be disabled for that origin.
 * @returns A non-negative integer if the origin is found in the whitelist, indicating that CORS should be enabled 
 *          for that origin.
 * @boolean corsOptions.origin - A boolean property indicating whether CORS is enabled (true) or disabled (false) 
 *          for the request's origin.
 * @description The `corsOptionsDelegate` function is used as a delegate function for the `cors` middleware,
 *              allowing for dynamic CORS configuration based on the request's origin. Delegate functions are 
 *              functions that are passed as arguments to other functions and are called within the outer function. 
 *              The `corsOptionsDelegate` function is passed as an argument to the `cors` middleware, allowing for dynamic CORS 
 *              configuration based on the request's origin.
 *              The `corsOptionsDelegate` function is used to determine the CORS options for a given request based 
 *              on its origin. It checks if the request's origin is in the whitelist and sets the `origin` property 
 *              of the `corsOptions` object accordingly.
 *              If the origin is in the whitelist, `origin` is set to true; otherwise, it is set to false.
 *              The function is used to enable or disable CORS for specific origins based on the whitelist. 
 * @param {Object} req - The HTTP request object.
 * @method {Function} callback - A callback function to be called with the CORS options.
 * @returns {void}
 * @note The whitelist array contains the allowed origins for cross-origin requests. 
 *       If the request's origin is in the whitelist, CORS is enabled for that origin;
 *       otherwise, CORS is disabled for that origin.
 * @callback The callback function is called with two arguments: an error (if any) and the CORS options for the request.
 * @argument {Error|null} err - The first argument of the callback function, indicating if there was an error.
 * @argument {Object} corsOptions - The second argument of the callback function, containing the CORS options for the request.
 * @returns {void}
 * @throws {Error} If there is an error while determining the CORS options, an error is thrown and passed to the callback function.
 * @argument {Error|null} err - The first argument of the callback function, indicating that there is no error.
 * @argument {Object} corsOptions - The second argument of the callback function, containing the CORS options for the request.

 */
// added 127.0.0.1 origin to whitelist to allow for testing with localhost and 127.0.0.1. This can also be done with
// Node.js and Express 
const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://127.0.0.1:3000', 'https://127.0.0.1:3443'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
/**
 * Call the cors() function that was imported earlier and it will return middleware configured to set a cors header of
 * Access-Control-Allow-Origin: * on the response object. A wildcard value allows cross-origin requests from any origin.
 */
exports.cors = cors();
/**
 * Call the corsWithOptions(corsOptionsDelegate) function, which is a middleware function that will be used in the 
 * routes to enable CORS for specific origins based on the whitelist. localhost:3000, localhost:3443, 127.0.0.1:3000, 
 * and 127.0.0.1:3443 are the only whitelisted origins that are allowed to make cross-origin requests to the server.
 */
exports.corsWithOptions = cors(corsOptionsDelegate);
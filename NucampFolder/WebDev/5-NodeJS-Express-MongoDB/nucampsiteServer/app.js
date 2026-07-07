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

// Create a new Express application
// The express() function creates an Express application, which is an object that has methods for 
// routing HTTP requests, configuring middleware, rendering HTML views, and registering a template engine.
var app = express();

// view engine setup
// Set the views directory and view engine for rendering templates
// The views directory is set to the 'views' folder in the root directory of the application, 
// and the view engine is set to 'pug', which is a template engine for rendering dynamic HTML pages.
// The path.join() method is used to create a cross-platform compatible path to the views directory, 
// ensuring that the application works correctly on different operating systems.
// __dirname is a Node.js global variable that represents the directory name of the current module. 
// It is used here to construct the absolute path to the 'views' directory, ensuring that the 
// application can locate the views folder regardless of where it is executed from.
// The app.set() method is used to set application-level settings, such as the views directory 
// and view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Use middleware for logging, parsing JSON and URL-encoded data, and handling cookies
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// The express.static() middleware is used to serve static files, such as images, CSS files, and JavaScript files,
// from the 'public' directory. This allows clients to access these files directly via their URLs.
// The path.join() method is used to create a cross-platform compatible path to the 'public' directory,
// ensuring that the application works correctly on different operating systems.
// __dirname is a Node.js global variable that represents the directory name of the current module.
app.use(express.static(path.join(__dirname, 'public')));
// indexRouter is mounted on the root path ('/'), and usersRouter is mounted on the '/users' path.
// The app.use() method is used to mount the routers for different resources on their respective paths.
app.use('/', indexRouter);
app.use('/users', usersRouter);
// Use the imported routers for their respective routes
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

// catch 404 and forward to error handler
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

const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');
/**
 * @description multer is middleware for handling multipart/form-data used mostly for uploading files.
 * @method diskStorage @memberof module:multer 
 * @param {Object} options - Options for configuring the storage engine.
 * @param {function} destination - Function to determine the destination folder for uploaded files.
 * @param {function} filename - Function to determine the filename for uploaded files.
 * @returns {Object} Storage engine for multer.
 * @method fileFilter @memberof module:multer
 * @param {Object} req - The request object.
 * @param {Object} file - The file object containing information about the uploaded file.
 * @param {function} cb - Callback function to indicate whether to accept or reject the file.
 * @returns {void}
 * @description The multer middleware is configured to store uploaded files in the 'public/images' 
 * directory and to filter files based on their extensions (only allowing image files).
 * @description The multer middleware is used in the POST route to handle file uploads. The 'imageFile' field
 * in the request body is expected to contain the image file to be uploaded.
 * @description The authenticate.verifyUser and authenticate.verifyAdmin middleware functions are used to 
 * ensure that only authenticated users with admin privileges can access the routes.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
/**
 * @description The imageFileFilter function is used as a file filter in the multer middleware 
 * to allow only image files (jpg, jpeg, png, gif) to be uploaded. If a non-image file is uploaded, 
 * an error is thrown.
 * @const {function} imageFileFilter - Function expression for filtering image files. 
 * @memberof module:multer
 * @description The imageFileFilter function checks the file extension of the uploaded file using a regular expression.
 * If the file extension does not match the allowed image file extensions (jpg, jpeg, png, gif), 
 * an error is thrown with the message 'You can upload only image files!'.
 * @property {string} originalname - The original name of the file object/uploaded file.
 * Used to check the file extension.
 * @method match of the String object is used to test if originalname matches the specified 
 * regular expression for image files.
 * @param {Object} req - The request object.
 * @param {Object} file - The file object containing information about the uploaded file.
 * @param {function} cb - Callback function to indicate whether to accept or reject the file.
 * @returns {void}
 * @throws {Error} If a non-image file is uploaded, an error is thrown with the message 
 * 'You can upload only image files!'.
 * @property {string} fieldname - The name of the form field associated with the uploaded file.
 * @method originalname.match @memberof module:multer
 * @regexp /\.(jpg|jpeg|png|gif)$/ - The original regex in the file to match image file extensions 
 * (jpg, jpeg, png, gif). Note that the bang (!) operator is used to negate the match prior to the 
 * regular expression, so if the file extension does not match, the error is thrown.
 * @regexp /\.(jpe?g|png|gif)$/i - Regular expression to match image file extensions (jpg, jpeg, png, gif) 
 * case-insensitively. ? is used to make the preceding character (e) optional, allowing for 
 * both jpg and jpeg extensions.
 * @note The regular expression is explained as follows:
 *  /   : These forward slash symbols mark the beginning and end of a regular expression 
 *        pattern in JavaScript.
 * 
 *  \.  : Matches a literal dot (.). The backslash \ escapes the ., since normally /./ would match 
 *        any single character, including a dot. Here it specifically matches the . character.
 * 
 *  (jpg|jpeg|png|gif)  : This is a group that matches any of the specified image file extensions.
 *  |   : pipe symbol acts as a logical OR, so it matches jpg, jpeg, png, XOR gif.
 *  $   : This means that testing for the existence of the specified pattern must begin at the end of 
 *        the string. In this case, it ensures that the file extension is at the end of the filename.
 *        In this case, it ensures that the file extension is at the end of the filename.
 * 
 *       @note that this search was originally case-sensitive, so it would not have matched uppercase extensions (e.g., 
 *       .JPG, .PNG) or poorly-formed extensions (e.g., .jpeg2000). By
 *       adding the i flag at the end of the regular expression, it makes the search case-insensitive, allowing for both 
 *       uppercase and lowercase extensions. toLowerCase() or toUpperCase() could also be used to normalize the case of 
 *       the filename before testing against the regex. The i flag is a more concise and efficient way to achieve 
 *       case-insensitive matching, and is commonly used in regex patterns for file extension validation. The JavaScript
 *       function toLowerCase() or toUpperCase() is more readable and explicit, and arguably more maintainable.
 * 
 *        @note that the search is from left to right, even though the $ symbol is used to indicate the end of the string. 
 *        The search will start from the beginning of the string and continue until it finds a match that occurs at the end 
 *        of the string. For a true right-to-left approach you'd need something like path.extname(file.originalname) from 
 *        Node's path module, which explicitly extracts the last extension without scanning unless the dot is at the beginning
 *        of the filename string.
 *        const path = require('path');
 *        path.extname('photo.backup.jpg');  // → '.jpg'
 *        path.extname('photo');             // → ''
 *        path.extname('.htaccess');         // → ''
 */
const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpe?g|png|gif)$/i)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
/**
 * @description multer is middleware for handling multipart/form-data used mostly for uploading files.
 * @module uploadRouter
 * @requires express
 * @requires multer
 * @requires authenticate
 * @note The multer middleware is configured to store uploaded files in the 'public/images' 
 * directory and to filter files based on their extensions (only allowing image files).
 * @note The multer middleware is used in the POST route to handle file uploads. The 'imageFile' field
 * in the request body is expected to contain the image file to be uploaded.
 * @note The authenticate.verifyUser and authenticate.verifyAdmin middleware functions are used to 
 * ensure that only authenticated users with admin privileges can access the routes.
 */
const upload = multer({ storage: storage, fileFilter: imageFileFilter});
/**
 * @description uploadRouter is an Express router that handles file uploads.
 * It uses the multer middleware to handle file uploads and provides routes for uploading images.
 * The router also includes authentication and authorization checks to ensure that only authenticated 
 * users with admin privileges can access the routes.
 * @module uploadRouter
 * @requires express
 * @requires multer
 * @requires authenticate
 * @note uploadRouter is mounted at the '/imageUpload' path in the main application file (app.js).
 * @note The router provides routes for GET, POST, PUT, and DELETE operations on the '/imageUpload' path.
 * The GET, PUT, and DELETE operations are not supported and will return a 403 Forbidden response.
 * The POST operation allows authenticated admin users to upload image files.
 * @note The uploaded image files are stored in the 'public/images' directory and the response includes
 * the details of the uploaded file in JSON format.
 * @note The multer middleware is configured to store uploaded files in the 'public/images'
 * directory and to filter files based on their extensions (only allowing image files).
 * @note The multer middleware is used in the POST route to handle file uploads. The 'imageFile' field
 * in the request body is expected to contain the image file to be uploaded.
 * @note The authenticate.verifyUser and authenticate.verifyAdmin middleware functions are used to 
 * ensure that only authenticated users with admin privileges can access the routes.
 */
const uploadRouter = express.Router();

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403; // Forbidden
    res.end('GET operation not supported on /imageUpload');
})
// multer middleware is used to handle file uploads. The 'imageFile' field in the request 
// body is expected to contain the image file to be uploaded.
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file); // Respond with the details of the uploaded file in JSON format
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;

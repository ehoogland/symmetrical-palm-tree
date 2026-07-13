/**
 * @description This file contains the configuration settings for the application, including 
 * the secret key for authentication and the MongoDB connection URL. 
 * @note the value of the secret key should be kept secure and not exposed in a production environment.
 * Instead use environment variables or a secure vault for sensitive information in production.
 * @note the MongoDB connection URL has changed; it had been set to connect to localhost.
 * @url 'mongodb://127.0.0.1:27017/nucampsite'
 * @port the MongoDB default port (27017)
 * @database 'nucampsite'
 * @key '12345-67890-09876-54321'
 * @properties secretKey, mongoUrl
 * @exports module.exports This syntax is used to export the configuration object so that 
 * it can be imported and used in other parts of the application. 
 * 'exports' alone would not work in this case, as it would not allow for the export of 
 * multiple properties.
 */
module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://127.0.0.1:27017/nucampsite'
}
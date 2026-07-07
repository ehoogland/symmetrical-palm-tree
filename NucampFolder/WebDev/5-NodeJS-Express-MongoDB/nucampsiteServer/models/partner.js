/** 
 * models/partner.js
 * This file defines the Mongoose schema and model for the Partner collection in the MongoDB database.
 * The Partner schema includes fields for name, image, featured status, and description. 
 * It also includes timestamps for when each document is created and last updated. 
 * 
 * Import the mongoose library to define the schema and model.
 * 
 */
// Import the mongoose library to define the schema and model.
const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // Store the image as a URL or file path string, which is the standard approach 
    // for storing images in a Mongoose schema or a database. This allows for easy 
    // retrieval and display of the image in the application.
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true
    }, 
}, 
// The timestamps option is set to true, which automatically adds createdAt and updatedAt 
// fields to the schema.
{
    timestamps: true
});
/** 
 * Export the Partner model based on the partnerSchema, allowing it to be used in other parts of the application.
 * Notice that 'Partner' is the name of the model, and it will be used as the collection name in the MongoDB database.
 * Mongoose automatically pluralizes the model name to determine the collection name, so the collection will be named 'partners'.
 */
module.exports = mongoose.model('Partner', partnerSchema);


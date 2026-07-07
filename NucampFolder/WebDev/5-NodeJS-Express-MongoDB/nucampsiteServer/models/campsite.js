/**
 * models/campsite.js
 * 
 * This file defines the Mongoose schema and model for the Campsite collection in the MongoDB database.
 * The Campsite schema includes fields for name, description, and an array of comments. 
 * Each comment has a rating, text, and author. 
 * It also includes timestamps for when each document is created and last updated. 
 */

// Import the mongoose library to define the schema and model.
const mongoose = require('mongoose');
// Create a shorthand reference to the Schema constructor.
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
/** 
 * Define the Campsite schema with fields for name, description, and an array of comments. 
 * The comments field is an array of commentSchema, allowing each campsite to have multiple comments.
 * The timestamps option is set to true, which automatically adds createdAt and updatedAt 
 * fields to the schema.
 */
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Campsite', campsiteSchema);

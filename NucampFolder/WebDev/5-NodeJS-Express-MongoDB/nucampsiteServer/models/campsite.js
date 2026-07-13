/**
 * models/campsite.js
 * 
 * This file defines the Mongoose schema and model for the Campsite collection in the MongoDB database.
 * The Campsite schema includes fields for name, description, and an array of comments. 
 * Each comment has a rating, text, and author. 
 * It also includes timestamps for when each document is created and last updated. 
 */

// Import the mongoose library and bind to constant variable mongoose to define the schema and model.
const mongoose = require('mongoose');
// Create a shorthand reference to the Schema constructor.
const Schema = mongoose.Schema;

/**
 * @description The mongoose-currency package is used to handle currency values in the schema.
 * It provides a Currency type that can be used to define fields that store currency values.
 * The loadType() method is called to load the Currency type into the mongoose instance.
 */
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
/** 
 * Define the Campsite schema with fields for name, description, cost, and an array of comments. 
 * The comments field is an array of commentSchema, allowing each campsite to have multiple comments.
 * The cost field uses the Currency type provided by mongoose-currency to store currency values.
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
       image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
        cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
}, {
    timestamps: true
});
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;
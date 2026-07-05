const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Load the mongoose-currency package which includes the loadType function
// and add it to mongoose. This allows us to use the Currency type in our schemas
// Note: This package is not included in the default mongoose package, 
// so we need to install it separately
// npm install mongoose-currency
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency; // Currency type, 
// which is a subclass of Number, that allows us to store currency values in our schemas

// Define the comment schema, which will be used as a subdocument in the campsite schema
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

// Define the campsite schema, which includes an array of comments
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
    comments: [commentSchema] // Array of comment subdocuments
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Export the Campsite model based on the campsite schema       

module.exports = mongoose.model('Campsite', campsiteSchema);

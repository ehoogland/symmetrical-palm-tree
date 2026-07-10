/** 
 * models/promotion.js
 * This file defines the Mongoose schema and model for the Promotion collection in the MongoDB database.
 * The Promotion schema includes fields for name, image, cost, and description. 
 * It also includes timestamps for when each document is created and last updated. 
 */
// Import the mongoose library to define the schema and model.
const mongoose = require('mongoose');
/**
 * @loadType Load the third-party mongoose extension package 
 * 'mongoose-currency' to handle currency data types in the schema. 
 * @npm install mongoose-currency first to use this package in a project.
 * mongoose-currencyallows for accurate representation and validation
 * of two decimal monetary values in the database, which is what is needed
 * for the cost field in the Promotion schema. 
 * @loadType method is called to load the Currency type into Mongoose,
 * and then the Currency type is accessed via mongoose.Types.Currency.
 */
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
// No need to create a shorthand reference to the Schema constructor 
// because it creates an extra variable that is used once in the file.
const promotionSchema = new mongoose.Schema({
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
        required: true,
    },
////////// FIX 1-3: You are missing the "featured" field.
    featured: {
        type: Boolean,
        default: false
    },
////////// END FIX 1-3
    cost: {
        type: Currency, // Uses mongoose-currency to store as string with a currency symbol
        required: true,
////////// NOTE: Another way you can ensure the field value will be greater than 0 is to make 0 the minimum.
        min: 0
////////// END NOTE
        //validate: [ // Optional validation, e.g., must be greater than zero
         //   {
         //       validator: function(cost) {
         //           return cost.value > 0;
         //       },
         //       message: 'Cost must be positive'
         //   }
        //]
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
 * Create and export the Promotion model based on the promotionSchema, allowing it to be used in other parts of the application.
 * Notice that 'Promotion' is the name of the model, and it will be used as the collection name in the MongoDB database.
 * Mongoose automatically pluralizes the model name to determine the collection name, so the collection will be named 'promotions'.
 */ 
 module.exports = mongoose.model('Promotion', promotionSchema);
/**
 * Another approach is to create the model and export it in two steps, 
 * which can be useful for testing or if you want to add methods to the model later. 
 * const Promotion = mongoose.model('Promotion', promotionSchema);
 * module.exports = Promotion;
 */

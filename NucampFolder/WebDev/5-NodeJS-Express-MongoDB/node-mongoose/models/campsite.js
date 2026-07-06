// models/campsite.js
// Import the mongoose module, which is an Object Data Modeling (ODM) library for MongoDB and Node.js
// It provides a schema-based solution to model application data,
// and includes built-in type casting, validation, query building, business logic hooks and more
// The mongoose module is used to connect to a MongoDB database, define schemas and models,
// and perform CRUD operations on the documents in the database
const mongoose = require('mongoose');
// Schema is a constructor function that is used to create a new schema object
// A schema is a blueprint for a model, which defines the structure of the documents in a collection
// The schema defines the fields and their types, as well as any validation rules or default values
// The schema can also define:
// virtual properties, instance methods, and static methods;
// virtuals, which are properties that are not stored in the database; 
// custom virtuals, which are properties that are computed from other properties;
// indexes, which are used to improve query performance;
// middleware, which are functions that are executed before or after certain operations;
// plugins, which are reusable pieces of code that can be added to a schema;
// discriminators, which are used to create multiple models with different schemas 
// that share the same underlying collection;
// subdocuments, which are documents that are embedded within other documents;
// arrays, which are used to store multiple values in a single field;
// custom arrays, which are used to store multiple values in a single field;
// references, which are used to create relationships between documents in different collections;
// getters and setters, which are functions that are called when a property is accessed or modified;
// custom types, which are user-defined types that can be used in the schema;
// custom validators, which are functions that are used to validate the values of fields;
// custom error messages, which are used to provide more informative error messages;
// custom options, which are used to customize the behavior of the schema;
// custom methods, which are functions that are defined on the schema 
// and can be called on instances of the model;
// custom statics, which are functions that are defined on the schema
// and can be called on the model itself;
// custom virtuals, which are properties that are computed from other properties or are properties 
// that are not stored in the database;
// custom indexes, which are used to improve query performance;
// custom middleware, which are functions that are executed before or after certain operations;
// custom plugins, which are reusable pieces of code that can be added to a schema;
// custom discriminators, which are used to create multiple models with different schemas
// that share the same underlying collection;
// custom subdocuments, which are documents that are embedded within other documents;
// custom references, which are used to create relationships between documents in different collections;
// custom getters and setters, which are functions that are called when a property is accessed or modified;

const Schema = mongoose.Schema;

// Define the comment schema, which will be used as a subdocument in the campsite schema
// The comment schema defines the structure of the comments array in the campsite schema
// The comment schema includes fields for rating, text, and author, as well as the timestamps option
// The timestamps option automatically adds createdAt and updatedAt fields to the comment schema
// The createdAt field will store the date and time when the comment was created
// The updatedAt field will store the date and time when the comment was last updated
// The timestamps option is a boolean that can be set to true or false
// If set to true, Mongoose will automatically add the createdAt and updatedAt fields to the schema
// The comment schema is used to create an array of comments in the campsite schema
// The comments array is an array of comment subdocuments, which are defined by the comment schema
// The comment schema is also used to validate the data in the comments array
// The comment schema is also used to define the structure of the comments array in the campsite schema
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
    // Automatically add createdAt and updatedAt fields to the comment schema
    // The createdAt field will store the date and time when the comment was created
    // The updatedAt field will store the date and time when the comment was last updated
    // The timestamps option is a boolean that can be set to true or false
    // If set to true, Mongoose will automatically add the createdAt and updatedAt fields to the schema
    timestamps: true
});

// Define the campsite schema, which includes an array of comments
// The campsite schema defines the structure of the documents in the campsites collection
// The campsite schema includes fields for name, description, image, elevation, cost, featured, and comments
// The comments field is an array of comment subdocuments, which are defined by the comment schema
// The campsite schema also includes the timestamps option, which automatically adds createdAt and 
// updatedAt fields to the schema

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
    comments: [commentSchema] // Array of comment subdocuments
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Export the Campsite model based on the campsite schema
// The model is a constructor function that is used to create instances of the model
// Why not just export the schema? 
// Because the model is what we use to interact with the database. In Mongoose, a model is a wrapper for the schema 
// that provides an interface to the database for creating, querying, updating, and deleting documents
// The model is created by calling mongoose.model() and passing in the name of the model and the schema
// The model name is the singular name of the collection, and Mongoose will automatically look for the plural, 
// lowercased version of the model name in the database
// Recall that a collection is a group of documents in the database that share the same schema
// Schema > Model > Collection > Document. 
// In SQL, this is similar to Database > Table > Row > Column
// The model is used to create and query documents in the collection and to perform CRUD operations on the documents in the collection
// For example, if the model name is 'Campsite', Mongoose will look for a collection named 'campsites' in the database.
module.exports = mongoose.model('Campsite', campsiteSchema);

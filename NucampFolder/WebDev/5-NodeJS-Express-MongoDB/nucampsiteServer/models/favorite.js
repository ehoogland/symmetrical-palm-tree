/**
 * Notes from 10,000 feet:
 * @general REST (Representational State Transfer) is an architectural style for designing networked applications. "Representational"
 *         refers to the representation of resources, which can be in various formats such as JSON or XML. "State Transfer"
 *         refers to the transfer of state between client and server. It relies on stateless, client-server communication,
 *         typically over HTTP, and uses standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources.
 * @general Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between 
 *          data, provides schema validation, and is used to translate between objects in code and the representation 
 *          of those objects in MongoDB.
 * @general This is a form of ODM (Object Data Modeling) that provides a schema-based solution to model application data.
 * 
 * @general A schema is a blueprint for the structure of documents in a MongoDB collection. It defines the fields, data types,
 *          and validation rules for the documents.
 * @general A model is a constructor compiled from a schema. It provides an interface for interacting with the documents in 
 *          the collection, including creating, reading, updating, and deleting documents. Objects created with a model are 
 *          instances of that model and represent documents in the collection.
 */

/**
 * favorite.js
 * @description This file defines the Mongoose schema and model for the "Favorite" collection in the MongoDB database.
 * @note Each document in the Favorite collection represents a user's favorite(d) campsites.
 * @requires mongoose - The Mongoose library for MongoDB object modeling. 
 * @path {models/favorite.js} - The path to this file in the project directory.
 * @constant {mongoose.Schema} favoriteSchema - Binds to the Mongoose schema for the "Favorite" collection.
 * @constructor {mongoose.Schema} - The constructor for creating a new Mongoose schema containing the structure,
 *                                  data types and required status of the documents in the "Favorite" collection.
 * @constant {mongoose.Model} Favorite - The Mongoose model for the "Favorite" collection.
 * @typedef {Object} FavoriteDocument - A document in the "Favorite" collection. This document contains the user's 
 *                                      ObjectId and an array of ObjectIds referencing the user's favorite campsites.
 * @function {mongoose.model} @constant Favorite - The Mongoose model for the "Favorite" collection, used to create 
 *                                                 and manage documents in the collection. 
 * @note A collection is a group of MongoDB documents that share the same structure and are stored in the same database. 
 *       The model provides an interface for interacting with the documents.
 * @property {mongoose.Schema.Types.ObjectId} user - The ObjectId of the user who has favorited campsites.
 * @Array @property {mongoose.Schema.Types.ObjectId[]} campsites - An array of ObjectIds referencing the user's 
 *                                                     favorite(d) campsites.
 * 
 
 * @note This enables the application to use Mongoose's populate() method to retrieve the full campsite documents when 
 *       querying a user's favorites, and to retrieve the full user details when populating the user field.
 * @note This schema provides a nested structure where each user can have multiple favorite campsites, and each campsite is 
 * referenced by its ObjectId.
 * @note The Schema is defined before the model is created, allowing for the definition of the structure and data 
 * types of the documents in the collection.
 * 
 */

const mongoose = require('mongoose');


const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  campsites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campsite'
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);

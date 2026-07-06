// index.js
// Import the mongoose module, which is an Object Data Modeling (ODM) library for MongoDB and Node.js
// It provides a schema-based solution to model application data,
// and includes built-in type casting, validation, query building, business logic hooks and more
// The mongoose module is used to connect to a MongoDB database, define schemas and models,
// and perform CRUD operations on the documents in the database
const mongoose = require('mongoose');
// Import the Campsite model, which is defined in the models/campsite.js file
// The Campsite model is used to interact with the campsites collection in the database
// The Campsite model is created by calling mongoose.model() and passing in the name of the model and the schema
// The model name is the singular name of the collection, and Mongoose will automatically look for the plural, 
// lowercase version of the model name in the database
const Campsite = require('./models/campsite');

const url = 'mongodb://127.0.0.1:27017/nucampsite';
// The connect variable is a promise that resolves when the connection to the database is successful
const connect = mongoose.connect(url, {});
// If the connection is successful, the promise resolves and the .then() method is called
// If the connection fails, the promise is rejected and the .catch() method is called
connect.then(() => {
    
    console.log('Connected correctly to server');
    // create is a method of the Campsite model that creates a new document in the campsites collection
    // The create method takes an object that defines the fields and values of the new document
    // The create method returns a promise that resolves to the newly created document
    // .then() is used to handle the promise returned by Campsite.create()
    //
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    /**
     * Constructor functions are used to create new instances of a model, which are called documents.
     * The new keyword is used to create a new instance of the Campsite model, which is a document in the campsites collection.
     * The new Campsite() constructor takes an object that defines the fields and values of the new document.
     * The new Campsite() constructor does not save the document to the database, it only creates a new instance of the model in memory.
     * The save() method is called on the new instance of the model to save the document to the database.
     * The save() method returns a promise that resolves to the newly created document.
     * 
     * Example:  
     * const newCampsite = new Campsite({
     * name: 'React Lake Campground',
     * description: 'test'
     * });  
     * newCampsite.save() -- Now there is no need to use the save() method here because the create() method already saves the document to the database, unlike
     * the new Campsite() constructor, which creates a new document in memory but does not save it to the database.
     */

    // The first .then() is called when the promise is resolved successfully
    .then(campsite => {
        console.log(campsite);
        // The findByIdAndUpdate() method is used to find a document by its _id field and update it with new values
        // The findByIdAndUpdate() method takes three arguments:
        // 1. The _id of the document to find
        // 2. An object that defines the fields and values to update
        // 3. An options object that can be used to customize the behavior of the method
        // The new option is set to true, which means that the updated document will be returned
        // If new is set to false, the original document will be returned
        // The findByIdAndUpdate() method returns a promise that resolves to the updated document
        // This replaces the find() and save() methods that were used in previous versions of Mongoose to update a document
        // The findByIdAndUpdate() method is a shorthand for the findOneAndUpdate() method, which is used to find a document 
        // by a specific field and update it with new values
        return Campsite.findByIdAndUpdate(campsite._id, {
            /* $set is used to update the value of a field 
            without affecting other fields in the document */
            $set: { description: 'Updated Test Document' }
        }, {
            // The new option is set to true, which means that the updated document will be returned
            // If new is set to false, the original document will be returned
            new: true
        });
    })
    // The second .then() is called when the promise returned by Campsite.findByIdAndUpdate() is resolved successfully
    // The campsite variable in this .then() is the updated document returned by findByIdAndUpdate()
    // The findByIdAndUpdate() method is used to find a document by its _id field and update it with new values
    // The findByIdAndUpdate() method takes three arguments:
    // 1. The _id of the document to find
    // 2. An object that defines the fields and values to update
    // 3. An options object that can be used to customize the behavior of the method
    // The new option is set to true, which means that the updated document will be returned
    // If new is set to false, the original document will be returned
    // The findByIdAndUpdate() method returns a promise that resolves to the updated document
    // The campsite variable in this .then() is the updated document returned by findByIdAndUpdate()
    .then(campsite => {
        console.log(campsite);
        
        // An array of comments is added to the campsite document using the push() method
        // The push() method adds a new comment object to the comments array in the campsite document
        // The comment object includes fields for rating, text, and author
        // The comment object is defined inline, but it could also be defined as a separate variable
        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });
        // .save() is a method called on a document that saves the changes made to a [sub]document in the database
        // The campsite.save() method is called to save the changes made to the campsite document in the database
        // It returns a promise that resolves to the updated document
        return campsite.save();
    })
    // The third .then() is called when the promise returned by campsite.save() is resolved successfully
    .then(campsite => {
        console.log(campsite);
        // The deleteMany() method is called on the Campsite model to delete all documents in the campsites collection
        // The deleteMany() method takes an optional filter object that can be used to specify which documents to delete
        // If no filter object is provided, all documents in the collection will be deleted
        // The deleteMany() method returns a promise that resolves to an object that contains information about the operation
        // The object returned by deleteMany() includes a deletedCount field that indicates the number of documents deleted
        return Campsite.deleteMany();
    })
    // The fourth .then() is called when the promise returned by Campsite.deleteMany() is resolved successfully
    .then(() => {
        // The mongoose.connection.close() method is called to close the connection to the database
        // Closing the connection is important to free up resources and prevent memory leaks
        // The return statement is used to return the promise returned by mongoose.connection.close()
        // This allows the next .then() or .catch() in the promise chain to be called after the connection is closed
        return mongoose.connection.close();
    })
    // The .catch() is called when any of the promises are rejected
    .catch(err => {
        console.log(err);
        // The mongoose.connection.close() method is called to close the connection to the database. No return
        // statement is needed here because this is the last statement in the promise chain.
        // Is it necessary to save a module to a variable in order to use it? No, but it is a good practice to do so.
        // The mongoose variable is a reference to the mongoose module, which is an object that contains all the 
        // methods and properties of the module.
        mongoose.connection.close();
    });
});

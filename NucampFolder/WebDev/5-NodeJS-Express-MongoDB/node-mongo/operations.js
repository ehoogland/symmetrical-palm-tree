// This file contains the database operations that we will be using in our application. 
// const assert = require('assert').strict;

// pass in the database we are using (the database object), 
// the document we want to insert, 
// the name of the collection we want to insert it into, and
// a callback function that will be called when the operation is complete. 
// The callback function will receive the result of the operation as an argument. 
exports.insertDocument = (db, document, collection) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    // First previous version of the code used the insertOne() method on the collection object to insert a new document into the collection.
    // The second version of the code uses the insertDocument() function defined in the operations.js file to insert a new document into the 
    // collection.
    // Finally, syntactic sugar is used in the form of async/await to make the code more readable and easier to understand.
    return coll.insertOne(document);
};

// The findDocuments() function takes in the database object, 
// the name of the collection we want to query, 
// and a callback function that will be called when the operation is complete.

exports.findDocuments = (db, collection) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    return coll.find({}).toArray();
    };
exports.removeDocument = (db, document, collection) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};    
    
exports.updateDocument = (db, document, update, collection) => {

    const coll = db.collection(collection);
    // document is an object that specifies the filter criteria for the document we want to update.
    // $set is an update operator that sets the value of a field in a document.
    // update is an object that specifies the fields we want to update and their new values.
    return coll.updateOne(document, { $set: update });
};
// File as of 3. Node and MongoDB Part 2 lesson
/*
const assert = require('assert').strict;

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, undefined);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, undefined);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, undefined);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, undefined);
        callback(result);
    });
};*/

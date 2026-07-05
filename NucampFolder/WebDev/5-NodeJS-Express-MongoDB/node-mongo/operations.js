// This file contains the database operations that we will be using in our application. 
// const assert = require('assert').strict;

// pass in the database we are using (the database object), 
// the document we want to insert, and
// the name of the collection we want to insert it into.
// The insertDocument() function will insert the document into the specified collection and return a promise
// that resolves to the result of the operation.

exports.insertDocument = (db, document, collection) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    // The insertOne() method is used to insert a single document into the collection.
    return coll.insertOne(document);
};

// The findDocuments() function takes in the database object and
// the name of the collection we want to query, 
// and returns a promise that resolves to an array of documents that match the query criteria.
// In this case, we are using an empty query object {} to retrieve all documents in the collection.
exports.findDocuments = (db, collection) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    return coll.find({}).toArray();
    };

// The removeDocument() function takes in the database object,
// the filter criteria for the document we want to remove, 
// and the name of the collection we want to remove it from. 
// It returns a promise that resolves to the result of the operation.
exports.removeDocument = (db, document, collection) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    // The deleteOne() method is used to delete a single document from the collection that matches the filter criteria.
    return coll.deleteOne(document);
};    
// The updateDocument() function takes in the database object,
// the filter criteria for the document we want to update, 
// the fields we want to update and their new values, 
// and the name of the collection we want to update. 
// It returns a promise that resolves to the result of the operation.    
exports.updateDocument = (db, document, update, collection) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    // document is an object that specifies the filter criteria for the document we want to update.
    // $set is an update operator that sets the value of a field in a document. The braces {} indicate 
    // that we are passing in an object that specifies the fields we want to update and their new values.
    // update is an object that specifies the fields we want to update and their new values.
    return coll.updateOne(document, { $set: update });
};
// Previously, we used callbacks to handle the results of our database operations:
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

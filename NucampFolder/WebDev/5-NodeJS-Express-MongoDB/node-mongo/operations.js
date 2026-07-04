const assert = require('assert').strict;

// pass in the database we are using (the database object), 
// the document we want to insert, 
// the name of the collection we want to insert it into, and 
// a callback function that will be called when the operation is complete. 
// The callback function will receive the result of the operation as an argument.
exports.insertDocument = (db, document, collection, callback) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    // We then call the insertOne() method on the collection object, passing in the document we want to insert 
    // and a callback function that will be called when the operation is complete.
    // The insertOne() method is an asynchronous (non-blocking) operation,
    // Instead, it will run in the background and call the callback function when it is finished.
    // The callback function will receive an error object (if an error occurred) and a 
    // result object (if the operation was successful) as arguments.
    coll.insertOne(document, (err, result) => {

        // We use the assert module to check if the error object is undefined,
        // which means that the operation was successful. If the error object is not undefined, 
        // an assertion error will be thrown and the program will terminate.
        assert.strictEqual(err, undefined);
        // call the callback function with the result of the operation as an argument.
        callback(result);
    });
};
// The findDocuments() function takes in the database object, 
// the name of the collection we want to query, 
// and a callback function that will be called when the operation is complete.

exports.findDocuments = (db, collection, callback) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);
    // We are not inserting any documents into the collection, so we can use the find() method without any arguments.
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, undefined);
        // call the callback function with the array of documents as an argument.
        callback(docs);
    });
};
exports.removeDocument = (db, document, collection, callback) => {
    // To obtain a reference to the collection, we use the db.collection() method, 
    // passing in the name of the collection as an argument.
    const coll = db.collection(collection);

    // The deleteOne() method is an asynchronous (non-blocking) operation,
    // It will run in the background and call the callback function when it is finished.
    // The callback function (err, result) will receive an error object (if an error occurred) and a 
    // result object (if the operation was successful) as arguments.
    // document is an object that specifies the filter criteria for the document we want to delete.
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, undefined);
        // call the callback function with the result of the operation as an argument.
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    // document is an object that specifies the filter criteria for the document we want to update.
    // $set is an update operator that sets the value of a field in a document.
    // update is an object that specifies the fields we want to update and their new values.
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, undefined);
        // call the callback function with the result of the operation as an argument.
        callback(result);
    });
};

// MongoClient supports both the new and legacy MongoDB drivers
// to run this code, you will need to have a MongoDB server running on your local machine.
// You can start a MongoDB server by running the following command in your terminal:
// mongod --dbpath <path_to_your_data_directory>

// Make sure to replace <path_to_your_data_directory> with the actual path where you want MongoDB to store its data. 
// Once the server is running, you can execute this script using Node.js.
// The MongoDB driver is a Node.js library that allows you to interact with a MongoDB database from your Node.js application.

// Make sure to install the MongoDB driver in your project by running the following command in your terminal:
// npm install mongodb-legacy

// This will install the MongoDB driver and add it to your project's dependencies in the package.json file.
// Make sure to start the MongoDB server from within the project directory where your package.json file is located, in this case,
// node-mongo, so that the driver can be found and used by your application.
// The MongoDB server is running on the default port (27017) and is accessible at the URL "mongodb://127.0.0.1:27017/"

// When you run the script, it will connect to the MongoDB server, drop the "campsites" collection if it exists, 
// insert a new document into the collection, and then retrieve and log all documents in the collection. 
// Finally, it will close the connection to the MongoDB server.

// require the MongoDB driver within our application to get access to database operations.
// The MongoClient class is used to connect to a MongoDB server and perform database operations, 
// such as CRUD (Create, Read, Update, Delete), and more.

// Support for both callback and promise-based APIs is provided by the MongoClient class.
// Hence the name legacy, as it supports the older callback-based API in addition to the newer promise-based API.
const { MongoClient } = require('mongodb-legacy');
const assert = require('assert');

// require the operations.js file to get access to the database operations defined in that file. Introduced in 3. Node and MongoDB Part 2 lesson.
const dboper = require('./operations');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'nucampsite';
// The MongoClient.connect() method is used to connect to the MongoDB server. 
// The connect() method takes in the URL of the MongoDB server, an options object, and a callback function 
// that will be called when the connection is established. 

// async/await syntax is used to handle asynchronous operations in a more readable and maintainable way,
// allowing us to write asynchronous code that looks and behaves like synchronous code.
(async function () {
  // The try/catch block is used to handle any errors that may occur during the execution of the code 
  // within the try block.
  try {
    // The await keyword is used to wait for the completion of an asynchronous operation 
    // before proceeding to the next line of code. The const client = await MongoClient.connect(url, {}); line 
    // waits for the connection to the MongoDB server to be established before proceeding.
    const client = await MongoClient.connect(url, {});
    console.log("Connected correctly to server");
    // The db() method is used to get a reference to a specific database within the MongoDB server.
    const db = client.db(dbName);

// The dropCollection() method is used to drop (delete) a collection from the database.
// The dropCollection() method takes in the name of the collection to be dropped as an argument and returns a promise
// that resolves to the result of the operation. If the collection does not exist, an error will be thrown.
    try {
      const dropResult = await db.dropCollection("campsites");
      console.log("Dropped Collection:", dropResult);
    } catch (err) {
      console.log("No collection to drop.");
    }
    // The documentToInsert object is defined to specify the document that we want to insert into 
    // the "campsites" collection.
    const documentToInsert = {
      name: "Breadcrumb Trail Campground",
      description: "Test",
    };
    // The insertDocument() function is called to insert the document into the "campsites" collection.
    // The insertDocument() function takes in the database object, the document to be inserted, 
    // and the name of the collection as arguments. The function returns a promise that resolves to 
    // the result of the operation, which is logged to the console.
    // const insertResult = await dboper.insertDocument(db, documentToInsert, "campsites");

    const insertResult = await dboper.insertDocument(
      db,
      documentToInsert,
      "campsites"
    );
    // The insertedId property of the result object contains the unique identifier of the newly inserted document.
    // The spread operator (...) is used here to copy the properties of the documentToInsert object into a new object,
    // which is then logged to the console along with the insertedId property.
    console.log("Insert Document:", {
      _id: insertResult.insertedId, 
      ...documentToInsert,
    });

    // The findDocuments() function is called to retrieve all documents in the "campsites" collection.
    // The findDocuments() function takes in the database object and the name of the collection as arguments,
    // and returns a promise that resolves to an array of documents that match the query criteria.
    // In this case, we are using an empty query object {} to retrieve all documents in the collection.
    const docs = await dboper.findDocuments(db, "campsites");
    console.log("Found Documents:", docs);

    /**
      * Next, we want to update the description of the "Breadcrumb Trail Campground" document 
      * and log how many documents were modified.
      * The updateDocument() function is called to update the document in the "campsites" collection.
      * The updateDocument() function takes in the database object, the filter criteria for the document we want to update,
      * the fields we want to update and their new values, and the name of the collection as arguments.
      * The function returns a promise that resolves to the result of the operation, which is logged to the console.
     */
    const updateResult = await dboper.updateDocument(
      db,
      { name: "Breadcrumb Trail Campground" },
      { description: "Updated Test Description" },
      "campsites"
    );
    // The modifiedCount property of the result object contains the number of documents 
    // that were modified by the update operation.
    console.log("Updated Document Count:", updateResult.modifiedCount); 

    // After updating the document, we want to retrieve all documents in the "campsites" collection again 
    // and log them to the console.    
    const updatedDocs = await dboper.findDocuments(db, "campsites");
    console.log("Found Documents:", updatedDocs);
    
    /**
     * Finally, we want to delete the "Breadcrumb Trail Campground" document and log how many documents were deleted.
     * The removeDocument() function is called to delete the document from the "campsites" collection.
     * The removeDocument() function takes in the database object, the filter criteria for the document 
     * we want to remove, and the name of the collection as arguments. 
     * The function returns a promise that resolves to the result of the operation, which is logged to the console.
     */
    const deleteResult = await dboper.removeDocument(
      db,
      { name: "Breadcrumb Trail Campground" },
      "campsites"
    );
    // The deletedCount property of the result object contains the number of documents
    // that were deleted by the remove operation.
    console.log("Deleted Document Count:", deleteResult.deletedCount);
  // After deleting the document, we want to close the connection to the MongoDB server.
  // The close() method is called on the client object to close the connection to the MongoDB server.
    await client.close();
    // catch block is used to handle any errors that may occur during the execution of the code within the try block.
  } catch (err) {
    // If an error occurs, it will be logged to the console using console.log(err).
    console.log(err);
  }
})();
/**
 * Support for both callback and promise-based APIs is provided by the MongoClient class.
 * Hence the name legacy, as it supports the older callback-based API in addition to the newer promise-based API.
 * The following code snippet demonstrates how to use the legacy MongoClient.connect() method to connect to a MongoDB server,
 * drop a collection, insert a document, retrieve documents, update a document, and delete a document using callbacks.

const { MongoClient } = require('mongodb-legacy');
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'nucampsite';
 */
/* legacy MongoClient.connect() method is used to connect to the MongoDB server.
The connect() method takes in the URL of the MongoDB server, an options object, and a callback function 
that will be called when the connection is established.
The callback function will receive an error object and a client object as arguments. 
The client object is used to interact with the MongoDB server and perform database operations.

MongoClient.connect(url, {}, (err, client) => {
  assert.strictEqual(err, undefined); 
  // The first argument of the assert.strictEqual() method is the actual value to test against, err, and the second 
  // argument is the expected value, undefined. If the two values are not equal, an Assertion Error will be thrown 
  // and the program will terminate/crash.
  console.log('Connected correctly to server');

  const db = client.db(dbName);

  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, undefined);
    
    console.log('Dropped Collection', result);
    
    const collection = db.collection('campsites');
    
    const documentToInsert = { name: 'Breadcrumb Trail Campground', description: 'Test' };
    

    // Pyramid of doom, also known as callback hell, is a term used to describe the situation where multiple nested callbacks 
    // are used in asynchronous programming, leading to code that is difficult to read and maintain.
/* the following code snippet demonstrates how to insert a document into a MongoDB collection using the insertOne() method,
and then retrieve all documents in the collection using the find() method, both of which are asynchronous operations that 
require callbacks to handle the results.
collection.insertOne(documentToInsert, (err, result) => {
        assert.strictEqual(err, undefined);

        console.log("Insert Document:", {
          _id: result.insertedId,
          ...documentToInsert,
        });

        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, undefined);

          console.log("Found Documents:", docs);

          client.close();
        });
      }
    );
  });
}); */
    /** 
     * When you insert a document into (a) MongoDB (collection), it automatically generates a unique identifier for that document, 
     * which is stored in the _id field of the document. To retrieve the unique identifier of the newly inserted document, 
     * you can access the insertedId property of the result object returned by the insertDocument() method. 

    dboper.insertDocument(db, documentToInsert, 'campsites', result => {
            console.log('Insert Document:', {                 
            
                // The insertedId property of the result object contains the unique identifier of the newly inserted document.
                _id: result.insertedId,  

                // The spread operator (...) is used here to copy the properties of the documentToInsert object into a new object, 
                // which is then logged to the console along with the insertedId property.
                ...documentToInsert, 
            });
            */
            /**
             * Next, we want to retrieve all documents in the "campsites" collection and log them to the console. To do this,
             * we call the findDocuments() method of the dboper module, passing in the db object, the name of the collection,
             * and a callback function that will be called with the retrieved documents.
            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);
             */

               /**
                * Finally, we want to update the description of the "Breadcrumb Trail Campground" document and [console.]log how many modified 
                * documents we have. 
               dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites', result => {
                        console.log('Updated Document Count:', result.modifiedCount);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);

                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});
*/
/* to run this code, you will need to have a MongoDB server running on your local machine. 
You can start a MongoDB server by running the following command in your terminal:
mongod --dbpath <path_to_your_data_directory>
We used mongod --dbpath=data to start the MongoDB server and specify the data directory where the database files will be stored.

Make sure to replace <path_to_your_data_directory> with the actual path where you want MongoDB to store its data. 
Once the server is running, you can execute this script using Node.js.
*/


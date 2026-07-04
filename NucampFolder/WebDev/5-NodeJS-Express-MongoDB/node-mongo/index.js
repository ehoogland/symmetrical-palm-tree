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
// require the operations.js file to get access to the database operations defined in that file.
const dboper = require('./operations');
const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'nucampsite';

MongoClient.connect(url, {}, (err, client) => {
  assert.strictEqual(err, undefined);

  console.log('Connected correctly to server');

  const db = client.db(dbName);

  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, undefined);
    console.log('Dropped Collection', result);

    const collection = db.collection('campsites');

    const documentToInsert = { name: 'Breadcrumb Trail Campground', description: 'Test' };

    dboper.insertDocument(db, documentToInsert, 'campsites', result => {
            console.log('Insert Document:', {
                _id: result.insertedId,
                ...documentToInsert,
            });

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

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
/*
to run this code, you will need to have a MongoDB server running on your local machine. 
You can start a MongoDB server by running the following command in your terminal:
mongod --dbpath <path_to_your_data_directory>

Make sure to replace <path_to_your_data_directory> with the actual path where you want MongoDB to store its data. 
Once the server is running, you can execute this script using Node.js.
*/


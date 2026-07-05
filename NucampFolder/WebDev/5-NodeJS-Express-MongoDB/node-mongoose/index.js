const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://127.0.0.1:27017/nucampsite';
const connect = mongoose.connect(url, {});

connect.then(() => {

    console.log('Connected correctly to server');

    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    // .then() is used to handle the promise returned by Campsite.create()
    // The first .then() is called when the promise is resolved successfully
    // The second .then() is called when the promise returned by Campsite.findByIdAndUpdate() is resolved successfully
    // The third .then() is called when the promise returned by campsite.save() is resolved successfully
    // The fourth .then() is called when the promise returned by Campsite.deleteMany() is resolved successfully
    // The .catch() is called when any of the promises are rejected
    //
    .then(campsite => {
        console.log(campsite);

        return Campsite.findByIdAndUpdate(campsite._id, {
            /* $set is used to update the value of a field 
            without affecting other fields in the document */
            $set: { description: 'Updated Test Document' }
        }, {
            new: true
        });
    })
    .then(campsite => {
        console.log(campsite);

        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});

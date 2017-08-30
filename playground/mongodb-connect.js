const {MongoClient, ObjectID} = require('mongodb');

var objID = new ObjectID();
console.log(objID);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to mongoDB server');
    } else {
        // console.log('Connected to MongoDB server');

        // db.collection('Users').insertOne({
        //     name: 'Timmy Turner',
        //     age: 25
        // },(err, result) => {
        //     if (err) {
        //         console.log('Unable to insert user');
        //     } else {
        //         console.log(result.ops[0]._id.getTimestamp());
        //     }
        // });

        // db.close();
    }

});
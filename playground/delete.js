const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect...');
    } else {
        console.log('Server connected!');

        // deleteMany
        // db.collection('Todos').deleteMany(
        //     {text: 'walk to the dog'}
        // ).then((doc) => {
        //     console.log(doc, ' Has been deleted.');
        // }, (err) => {
        //     console.log(err);
        // });

        // deleteOne
        // db.collection('Users').deleteOne({
        //     name: 'Timmy Turner'
        // }).then((result) => {
        //     console.log(result);
        // });

        // FindOneAndDelete
        db.collection('Users').findOneAndDelete({
            _id: new ObjectID('59a6095b545e7f67dcaf6927')
        }).then((results) => {
            console.log(JSON.stringify(results, undefined, 2));
        });
    }
});
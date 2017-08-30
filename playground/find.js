const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to server');
    } else {
        console.log('Connected to mongo server');

        // db.collection('Todos').find({
        //     _id: new ObjectID('59a60e37745e008434ecb85e')
        // }).toArray().then((docs) => {
        //     console.log('Todos');
        //     console.log(JSON.stringify(docs, undefined, 2));
        // }, (err) => {
        //     console.log('Unable to find documents', err);
        // });
        db.collection('Users').find({
            name: 'Timmy Turner'
            
        }).toArray().then((docs) => {
            var names = docs;
            for (let name of names) {
                console.log(`Name: ${name.name} Age: ${name.age}`);
            }
        }, (err) => {
            console.log('Unable to find documents', err);
        });

        // db.close();
    }
});
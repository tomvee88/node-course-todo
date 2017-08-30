const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to server');
    } else {
        console.log('Server started!');

        // db.collection('Todos').findOneAndUpdate({
        //     _id: new ObjectID('59a5ff1562f4b56e54207b02')
        // }, {
        //     $set: {
        //         completed: true
        //     }
        // },{
        //     returnOriginal: false
        // }).then((res) => {
        //     console.log(res);
        // });

        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('59a60055049572646c1f6ecb')
        }, {
            $set: {
                name: 'Tommy Von'
            },
            $inc: {
                age: 3
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });
    }
});
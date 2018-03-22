const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user'); 

let id = '5ab3fdf6aa8096a828c9375a';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// };

User.findById(id).then((user) => {
    if(!user) {
        return console.log('No user found!');
    }

    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
});
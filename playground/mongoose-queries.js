const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');
const {ObjectID} = require('mongodb');

var id = '59a86e0f6ee66a62b44b02874';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos, 'todos');
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo is going to be: ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         console.log('ID not found');
//     } else {
//         console.log('todo', todo);
//     }

// }).catch((e) => {
//     console.log(e);
// });

User.findById(id).then((user) => {
    if (!user) {
        console.log('No users found');
    } else {
        console.log('User: ');
        console.log(JSON.stringify(user, undefined, 2));
    }
}).catch((e) => {
    console.log(e);
});
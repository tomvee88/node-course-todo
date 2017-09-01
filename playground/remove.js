const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');
const {ObjectID} = require('mongodb');

// Todo.remove({}).then((todos) => {
//     console.log(todos);
// });

// //find by id and remove
// Todo.findByIdAndRemove('59a9cf403ad0879188019eea').then((result) => {
//     console.log(result);
// });

//find one and remove
Todo.findOneAndRemove({
    text: 'make some lunch'
}).then((todo) => {
    console.log(todo);
});
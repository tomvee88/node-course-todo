const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user'); 

Todo.findByIdAndRemove('5ab573996461ac2ccd77b32d').then((todo) => {
    console.log(todo);
});
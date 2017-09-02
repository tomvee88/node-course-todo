const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

//local ==============

const todos = [
    {
        _id: new ObjectID(),
        text: 'Testing 123'
    },
    {
        _id: new ObjectID(),
        text: 'Houston we have a problem'
    }
];

var hexId = todos[0]._id;

console.log(hexId);
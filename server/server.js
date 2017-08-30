const express = require('express');
const bodyParser = require('body-parser');
// local variables
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/users');

var app = express();

// the return value from this json method is a returned function AND THAT IS THE MIDDLE
// GIVEN TO EXPRESS!!!
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var cook = new Todo({
        text: req.body.text
    });

    cook.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});
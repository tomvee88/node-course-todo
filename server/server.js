const express = require('express');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
// local
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
// middleware 
app.use(bodyParser.json());
let port = 3000;

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => { 
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

module.exports = {app};
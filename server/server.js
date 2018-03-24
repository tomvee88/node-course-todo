const express = require('express');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
// local
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
// middleware 
// req => sends everything through the 'body' e.g text, completed, etc..
app.use(bodyParser.json());
let port = process.env.PORT || 3000;

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

// individual todo /todo/123u65425834hdkj
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    // valid id
    let validID = ObjectID.isValid(id);
    // 404 - send back
    if(!validID) {
        res.status(404).send();
    }   
    // findbyid
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
    
});

// delete 
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    // valid if its an actual ID
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });

});

// patch 
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completed_at = new Date().getTime();
    } else {
        body.completed = false;
        body.completed_at = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

let boo = 'true';
console.log(typeof(boo) === 'boolean');

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

module.exports = {app};
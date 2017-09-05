const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
// local variables
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/users');


var app = express();

var port = process.env.PORT || 3000;

// the return value from this json method is a returned function AND THAT IS THE MIDDLE
// GIVEN TO EXPRESS!!!
app.use(bodyParser.json());

//post todo
app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);    
    }).catch((e) => {
        res.status(400).send(e);
    });

});

// get todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    });
});

// app.get individual todo
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    var validID = ObjectID.isValid(id);

    if (!validID) {
        res.status(404).send('Invalid ID');
    } else {
        Todo.findById(id).then((todo) => {
            res.send({todo});
        }).catch((e) => {
            done(e);
        });
    }
});

app.delete('/todos/:id', (req, res) => {
    //get the id
    //validate the id - if not 404
    //remove todo by id
        //success
            //if no doc send 404
            //if doc send back w 200
        //error
            //400 with empty body
    var id = req.params.id;
    var validID = ObjectID.isValid(id);
    
    if (!validID) {
        res.status(404).send();
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.status(200).send({todo});
            }
        }).catch((e) => {
            res.status(400).send(e);
        });
    }

});

// update - patch method
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    //varify id
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    };

    //check if Boolean
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, 
        {
            $set: body
        },
        {
            new: true
        }
    ).then((todo) => {
        if(!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }).catch((e) => {
        res.status(404).send();
    });
});


app.listen(port, () => {
    console.log(`Starting ${port}`);
});

module.exports = {app};
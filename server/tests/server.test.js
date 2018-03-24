const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completed_at: 2324235
    }
];
    

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        let text = 'Some test text';
        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todo) => {
                    expect(todo.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });;
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        let id = new ObjectID().toHexString();
        // get 404 back
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        // invalid id get return 404 for non-object id
        let id = 'abc123';
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove todo', (done) => {
        let hexID = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexID).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        let id = 'abc123';

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('UPDATE /todos/:id', () => {
    it('should update the todo', (done) => {
        // grab id of first item
        // update the text, set completed to true
        // res 200
        // cust: text is changed, completed is true, completed_at 'toBEA' a number
        let id = todos[0]._id.toHexString();

        request(app)
            .patch(`/todos/${id}`)
            .send({
                text: 'updated...',
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('updated...');
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completed_at).toBeA('number');
            })
            .end(done);
    });

    it('should clear completed_at when todo is not completed', (done) => {
        // grab id of second todo item
        // update text, set completed to false
        // 200
        // text is changed, completed false, completed_at is null 'toNotExist'
        let id = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${id}`)
            .send({
                text: 'updated...',
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('updated...');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completed_at).toNotExist();
            })
            .end(done);
    });
});
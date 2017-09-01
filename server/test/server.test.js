const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

//local ==============
const {app} = require('./../server');
const {Todo} = require('./../models/todos');

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

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todo', () => {
    it('should create todo', (done) => {
        var text = 'Testing todo 1';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);

            })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    Todo.find({text}).then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch((e) => {
                        done(e);
                    });
                }
            });
    });

    it('should not create todo', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    }).catch((e) => {
                        done(e);
                    });
                }
            });
    });
});

describe('GET /todos', () => {
    it('should get todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                   Todo.find().then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                   }).catch((e) => {
                        done(e);
                   });
                }
            });
            // .expect((res) => {
            //     expect(res.body.todos.length).toBe(2);
            // })
            // .end(done);
    });

    it('should get individual todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
});



















// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos);
//     }).then(() => {
//         done();
//     });
// });

// describe('POST /todos', () => {
//     it('should create todo', (done) => {
//         var text = 'something to do';

//         request(app)
//             .post('/todos')
//             .send({text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     done(err);
//                 } else {
//                     Todo.find({text}).then((todos) => {
//                         expect(todos.length).toBe(1);
//                         expect(todos[0].text).toBe(text);
//                         done();
//                     }).catch((e) => {
//                         done(e);
//                     })
//                 }
//             });
//     });

//     it('should not create todo', (done) => {

//         request(app)
//             .post('/todos')
//             .send({})
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     done(err);
//                 } else {
//                     Todo.find().then((todos) => {
//                         expect(todos.length).toBe(2);
//                         done();
//                     }).catch((e) => {
//                         done(e);
//                     });
//                 }
//             });
//     });

// });

// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);
//     });
// });

// describe('GET /todos/:id', () => {
//     it('should get todo with individual ID', (done) => {
//         request(app)
//             .get(`/todos/${todos[0]._id.toHexString()}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo.text).toBe(todos[0].text);
//             })
//             .end(done);
//     });
// });
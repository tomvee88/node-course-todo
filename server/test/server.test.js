const expect = require('expect');
const request = require('supertest');

//local ==============
const {app} = require('./../server');
const {Todo} = require('./../models/todos');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('TODO /post', () => {
    it('should create todo', (done) => {
        var text = 'something to do';

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
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch((e) => {
                        done(e);
                    })
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
                        expect(todos.length).toBe(0);
                        done();
                    }).catch((e) => {
                        done(e);
                    });
                }
            });
    });

});
import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../src/app';

const data = {
    "login": "TEST_USERNAME_UNIQUE",
    "password": "zbtLMEv8",
    "email": "Ivy234@hotmail.com"
}

// GET
describe('Get USERS', () => {
    it('should return users list', async () => {
        const res = await request(app)
            .get('/api/example/users');
        expect(res.error.text).toBeUndefined();
        expect(res.statusCode).toEqual(200);
    })
})

// POST
describe('Post USERS', () => {
    it('should create and return a user', async () => {
        const res = await request(app)
            .post('/api/example/users')
            .send(data);
        expect(res.error.text).toBeUndefined();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user')
        data.id = res.body.user.id;
    })
})

// GET
describe('Get USERS by Id', () => {
    it('should return a user', async () => {
        const res = await request(app)
            .get('/api/example/users/' + data.id);
        expect(res.error.text).toBeUndefined();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user')
    })
})

// PUT
describe('Put USERS', () => {
    it('should edit and return a user', async () => {

        const res = await request(app)
            .put('/api/example/users')
            .send(data);
        expect(res.error.text).toBeUndefined();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user')
    })
})

// DELETE
describe('Delete USERS by Id', () => {
    it('should delete a user', async () => {
        const res = await request(app)
            .delete('/api/example/users/' + data.id);
        expect(res.error.text).toBeUndefined();
        expect(res.statusCode).toEqual(200);
    })
})

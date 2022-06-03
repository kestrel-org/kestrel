import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../src/app';

let id;

const data = {
    "login": "TEST_USERNAME_UNIQUE",
    "password": "zbtLMEv8",
    "email": "Ivy234@hotmail.com"
}

// GET
describe('Get USERS', () => {
    it('should return users list', async () => {
        const res = await request(app)
            .get('/api/exemple/users');
        expect(res.statusCode).toEqual(200);
    })
})

// POST
describe('Post USERS', () => {
    it('should create and return an user', async () => {
        const res = await request(app)
            .post('/api/exemple/users')
            .send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.user.login).toEqual(data.login);
        expect(res.body.user.password).toEqual(data.password);
        expect(res.body.user.email).toEqual(data.email);

        id = res.body.user.id;
    })
})

// GET
describe('Get USERS by Id', () => {
    it('should return an user', async () => {
        const res = await request(app)
            .get('/api/exemple/users/' + id);
        expect(res.statusCode).toEqual(200);
        expect(res.body.user.login).toEqual(data.login);
        expect(res.body.user.password).toEqual(data.password);
        expect(res.body.user.email).toEqual(data.email);
    })
})

// PUT
describe('Put USERS', () => {
    it('should edit and return an user', async () => {

        let data2 = data;
        data2.login = "TEST_USERNAME_UNIQUE2";
        data2.id = id;

        const res = await request(app)
            .put('/api/exemple/users')
            .send(data);

        expect(res.statusCode).toEqual(200);
        expect(res.body.user.login).toEqual(data2.login);
        expect(res.body.user.password).toEqual(data2.password);
        expect(res.body.user.email).toEqual(data2.email);
    })
})

// DELETE
describe('Delete USERS by Id', () => {
    it('should delete an user', async () => {
        const res = await request(app)
            .delete('/api/exemple/users?id=' + id);
        expect(res.statusCode).toEqual(200);
    })
})
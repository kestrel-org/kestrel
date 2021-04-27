require("regenerator-runtime/runtime");

const request = require('supertest')
const app = require('../src/app')

// GET
describe('Get Exemple', () => {
    it('should return number', async () => {
        const res = await request(app)
            .get('/api/exemple?number=6')
        expect(res.statusCode).toEqual(200)
        expect(res.body.number).toEqual("6")
    })
})
const { User } = require('../../model/user')
const { Category } = require('../../model/category')
let request = require('supertest');
let server;

describe('Auth middleware', () => {

    beforeEach(() => { server = require('../../index') })
    afterEach(async () => { 
        server.close() 
        await Category.remove({ })
    })

    let token;
    const exec = () => {
        return request(server)
            .post('/api/categories')
            .set('x-auth-token', token)
            .send({ name: 'genre 1' })
    }

    beforeEach(() => {
        token = new User().generateAuthToken()
    })

    it('Should return 401 if not token is provided', async () => {
        token = '';

        let res = await exec()

        expect(res.status).toBe(401);
    })

    it('Should return 400 if token is invalid', async () => {
        token = 'a';

        let res = await exec()

        expect(res.status).toBe(400);
    })

    it('Should return 200 if token is valid', async () => {
        let res = await exec()

        expect(res.status).toBe(200);
    })
})


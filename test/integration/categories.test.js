const request = require('supertest')
const mongoose = require('mongoose')
const { Category } = require('../../model/category')
const { User } = require('../../model/user')
let server;


describe('/api/categories', () => {
    beforeEach(() => { server = require('../../index') })
    afterEach(async () => { 
        server.close() 
        await Category.remove({});
    })

    describe('GET /', () => {
        it('Should return all categories', async () => {
            await Category.collection.insertMany([
                { name: 'genre 1' },
                { name: 'genre 2' }
            ])

            const res = await request(server).get('/api/categories')

            expect(res.status).toBe(200)
        })
    })

    describe('GET id /', () => {

        it('Should return a category id is passed', async () => {
            const category = new Category({ name: 'genre 1' })
            await category.save()

            const res = await request(server).get('/api/categories/' + category._id)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name', category.name)
        })

        it('Should return 404 if invalid category id is passed', async () => {
            const res = await request(server).get('/api/categories/1')

            expect(res.status).toBe(404)
        })

        it('Should return 404 if no category with a given Id', async () => {
            const id = mongoose.Types.ObjectId().toHexString()
            const res = await request(server).get('/api/categories/' + id )

            expect(res.status).toBe(404)
        })
    })

    describe('POST /', () => {

        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/api/categories')
                .set('x-auth-token', token)
                .send({ name })
        }

        beforeEach(() => { 
            token = new User().generateAuthToken() 
            name = 'genre 1'
        })

        it('Should return 401if the client not logged In', async () => {
            token = '';
            const res = await exec()

            expect(res.status).toBe(401)
        })
    
        it('Should return 400 if the Category is not valid', async () => {
            name = ''

           const res = await exec()

            expect(res.status).toBe(400)
        })
    
        it('Should save the Category to the DB if it is valid', async () => {

            await exec()

            const category = await Category.find({ name: 'genre1'})

            expect(category).not.toBeNull()
        })
        
        it('Should return the Category to the DB if it is valid', async () => {
            const res = await exec()

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre 1');
        })
    })
})


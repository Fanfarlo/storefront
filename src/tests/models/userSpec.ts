import { UserStore, User } from "../../models/user"
import supertest from 'supertest'
import app from '../../server'
import { response } from "express"

const request = supertest(app)
const store = new UserStore()


describe('User model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined()         
    })

    // it('should return an array of users', async () => {
    //     const response = await request.get('/users')
    //     expect(response.status).toBe(200)
    // })

    // beforeAll (async () => {    
     
    // })

    it('should create an user', async () => {
        
        const resolve = await store.create({
            firstName: 'testuser',
            lastName: 'test',
            password: 'hola'
        })

        expect(resolve).toBeDefined
    })

//     afterAll (async () => {    
//        const clean = await store.delete(resolve)
})
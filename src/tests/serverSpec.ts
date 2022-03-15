import supertest from 'supertest'
import { orderRoutes } from '../handlers/orders'
import app from '../server'

const request = supertest(app)

describe ('Test server endpoint', () => {
    it('expect GET to be status 200', async () =>{
    const response = await request.get('/')
    expect(response.status).toBe(200)
    })
})
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Product methods', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6Ik1hbHBhcnRpZGEiLCJwYXNzd29yZCI6IiQyYiQxMCRaa0g4SFBWbmRRWkZESzQvbGFFY2F1NUlTTzNkTndUN1ZVTTR3Lkp6TjNaSm9QeHA4WXRtTyJ9LCJpYXQiOjE2NDcwNjQ0Mzd9.4fgYpSViA0PBe9qyJbj3mg71_05xmq1xp_QA7_ipZoE';
    const producTest = {
        name: 'ZenBook',
        price: 1500,
        category: 'ASUS'
    };
    it('should create a product', async () => {
        await request
            .post('/products')
            .auth(token, { type: 'bearer' })
            .send(producTest)
            .expect(200)
            .then(async (res) => {
            expect(res.body).toBeTruthy;
            console.log(res.body);
        })
            .catch((err) => console.error(err.message));
    });
    it('should show a product by id', async () => {
        await request
            .get('/products/1')
            .expect(200)
            .then(async (res) => {
            expect(res.body).toBeTruthy;
            console.log(res.body);
        })
            .catch((error) => {
            throw new Error(`Test fail, cannot show a product by id. Error:${error}`);
        });
    });
    it('should return products list', async () => {
        await request
            .get('/products')
            .expect(200)
            .then(async (res) => {
            expect(res.body).toBeTruthy;
            console.log(res.body);
        })
            .catch((error) => {
            throw new Error(`Test fail, cannot return products list. Error:${error}`);
        });
    });
    //  afterAll(async () =>{
    //      const conn = await client.connect()
    //     await conn.query("DELETE FROM users;")
    //     await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
    //     await conn.query('DELETE FROM products;')
    //     await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    //     conn.release()
    //  })
});

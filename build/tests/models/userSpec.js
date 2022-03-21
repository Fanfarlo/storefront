"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model Methods', () => {
    it('should have an index method', async () => {
        expect(store.index).toBeDefined();
        console.log(store.index);
    });
    it('should create an user', async () => {
        const result = await store.create({
            firstName: 'toti',
            lastName: 'last',
            password: 'pass1'
        });
        console.log(result);
        expect(result.id).toMatch('1');
    });
    it('should return a users list', async () => {
        const result = await store.index();
        console.log(result);
        expect(result.length).toEqual(1);
    });
    it('should show an user', async () => {
        const result = await store.show('1');
        // console.log(result)
        expect(result.id).toMatch('1');
    });
    it('should auth an user', async () => {
        const result = await store.authenticate('toti', 'pass1');
        // console.log(result)
        expect(result).toBeTruthy;
    });
    //   afterAll(async() => {
    //     const conn = await client.connect()
    //     await conn.query('DELETE FROM order_products')
    //     await conn.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1')
    //     await conn.query('DELETE FROM orders')
    //     await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1')
    //     await conn.query('DELETE FROM products')
    //     await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1')
    //     await conn.query('DELETE FROM users')
    //     await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1')
    //     conn.release()
    // })
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.UserStore();
describe('User model', () => {
    // let userTest:object
    // let token:string;
    beforeAll(async () => {
        const userTest = await store.create({
            firstName: 'testuser',
            lastName: 'test',
            password: 'hola'
        });
        //     // const response = request.post('/users')
        //     console.log(userTest)
        //     token = jwt.sign({user: userTest}, process.env.TOKEN_SECRET||'')
        //     console.log(token)
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should return a users list', async () => {
        // const response = await request.get('/').set('Auth', token)
        const result = await store.index();
        // console.log(result)
        expect(result.length).toEqual(1);
    });
    it('should show an user', async () => {
        const result = await store.show('1');
        // console.log(result)
        expect(result).toBeTruthy;
    });
    it('should auth an user', async () => {
        const result = await store.authenticate('testuser', 'hola');
        // console.log(result)
        expect(result).toBeTruthy;
    });
    it('should delete an user', async () => {
        const result = await store.delete('1');
        // console.log(result)
        expect(result).toBeNull;
    });
    // it('should create an user', async () => {
    //     const newUserTest = {
    //     firstName: 'testuser1',
    //     lastName: 'test',
    //     password: 'hola'
    // }
    //     await request.post('/users')
    //     .set('Auth', token)
    //     .send(userTest)
    //     .expect(200)
    //     .then(async (res) => {
    //         expect(res.body).toBeTruthy;
    //     })
    //     .catch(err => console.error(err.message));
    //     const resolve = await store.create({
    //         firstName: 'testuser',
    //         lastName: 'test',
    //         password: 'hola'
    //     })
    //     expect(resolve).toBeDefined()
});
//     afterAll (async () => {    
//        const clean = await store.delete(resolve)

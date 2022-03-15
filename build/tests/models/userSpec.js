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
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
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
        });
        expect(resolve).toBeDefined;
    });
    //     afterAll (async () => {    
    //        const clean = await store.delete(resolve)
});

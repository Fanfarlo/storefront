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
            firstName: 'usertest2',
            lastName: 'last',
            password: 'pass1'
        });
        console.log(result);
        expect(result.id).toMatch('6');
    });
    it('should show an user', async () => {
        const result = await store.show('1');
        // console.log(result)
        expect(result.id).toMatch('1');
    });
    it('should return a users list', async () => {
        const result = await store.index();
        console.log(result);
        expect(result.length).toEqual(6);
    });
    it('should auth an user', async () => {
        const result = await store.authenticate('usertest2', 'pass1');
        // console.log(result)
        expect(result).toBeTruthy;
    });
    it('should delete an user by id', async () => {
        const result = await store.delete('6');
        console.log(result);
        expect(result).toBeTruthy;
    });
});

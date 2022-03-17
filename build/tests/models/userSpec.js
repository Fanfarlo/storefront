'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const user_1 = require('../../models/user');
const supertest_1 = __importDefault(require('supertest'));
const server_1 = __importDefault(require('../../server'));
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.UserStore();
describe('User methods', () => {
  it('should have an index method', async () => {
    expect(store.index).toBeDefined();
  });
  it('should create an user', async () => {
    const result = await store.create;
    // console.log(result)
    expect(result).toBeTruthy;
  });
  it('should return a users list', async () => {
    const result = await store.index();
    // console.log(result)
    expect(result).toEqual([]);
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
    expect(result).toBeTruthy;
  });
});

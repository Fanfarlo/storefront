'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const server_1 = __importDefault(require('../../server'));
const request = (0, supertest_1.default)(server_1.default);
describe('Users endpoint', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6Ik1hbHBhcnRpZGEiLCJwYXNzd29yZCI6IiQyYiQxMCRaa0g4SFBWbmRRWkZESzQvbGFFY2F1NUlTTzNkTndUN1ZVTTR3Lkp6TjNaSm9QeHA4WXRtTyJ9LCJpYXQiOjE2NDcwNjQ0Mzd9.4fgYpSViA0PBe9qyJbj3mg71_05xmq1xp_QA7_ipZoE';
  it('should create an user', async () => {
    await request
      .post('/users')
      .auth(token, { type: 'bearer' })
      .send({
        firstname: 'usertest',
        lastname: 'last',
        password: 'passtest'
      })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
      })
      .catch((error) => console.error(error.message));
  });
  it('should show an user by id', async () => {
    await request
      .get('/users/1')
      .expect(200)
      .auth(token, { type: 'bearer' })
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        console.log(res.body);
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
  it('should show users list', async () => {
    await request
      .get('/users')
      .expect(200)
      .auth(token, { type: 'bearer' })
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        console.log(res.body);
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
  it('should auth an user', async () => {
    await request
      .post('/users/authenticate')
      .expect(200)
      .send({ username: 'usertest', password: 'passtest' })
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        console.log(res.body);
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
  // afterAll(async() => {
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

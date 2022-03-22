'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const server_1 = __importDefault(require('../../server'));
const database_1 = __importDefault(require('../../database'));
const request = (0, supertest_1.default)(server_1.default);
describe('Order methods', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6Ik1hbHBhcnRpZGEiLCJwYXNzd29yZCI6IiQyYiQxMCRaa0g4SFBWbmRRWkZESzQvbGFFY2F1NUlTTzNkTndUN1ZVTTR3Lkp6TjNaSm9QeHA4WXRtTyJ9LCJpYXQiOjE2NDcwNjQ0Mzd9.4fgYpSViA0PBe9qyJbj3mg71_05xmq1xp_QA7_ipZoE';
  const orderComplete = {
    status: 'complete',
    user_id: '1'
  };
  it('should create an order', async () => {
    const conn = await database_1.default.connect();
    await conn.query(
      "INSERT INTO users (firstname, lastname, password) VALUES ('miguelo', 'malpartida', 'pass') RETURNING *;"
    );
    await conn.query(
      "INSERT INTO products (name, price, category) VALUES ('VivoBook', 2000, 'ASUS') RETURNING *;"
    );
    await request
      .post('/orders')
      .auth(token, { type: 'bearer' })
      .send(orderComplete)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        console.log(res.body);
      })
      .catch((error) => console.error(error.message));
  });
  it('should show an order', async () => {
    await request
      .get('/orders/1')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
        console.log(res.body);
      })
      .catch((error) => console.error(error.message));
  });
  it('should show an orders list', async () => {
    await request
      .get('/orders')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
        console.log(res.body);
      })
      .catch((error) => console.error(error.message));
  });
  it('should add a products to an order', async () => {
    await request
      .post('/orders/1/products')
      .auth(token, { type: 'bearer' })
      .send({
        productId: '1',
        quantity: 10
      })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
        console.log(res.body);
      })
      .catch((error) => console.error(error.message));
  });
});

'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const order_1 = require('../../models/order');
const supertest_1 = __importDefault(require('supertest'));
const server_1 = __importDefault(require('../../server'));
const request = (0, supertest_1.default)(server_1.default);
const store = new order_1.OrderStore();
describe('Order methods', () => {
  const orderTest = {
    productId: 1,
    quantity: 20,
    userId: 1,
    status: 'complete'
  };
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6Ik1hbHBhcnRpZGEiLCJwYXNzd29yZCI6IiQyYiQxMCRaa0g4SFBWbmRRWkZESzQvbGFFY2F1NUlTTzNkTndUN1ZVTTR3Lkp6TjNaSm9QeHA4WXRtTyJ9LCJpYXQiOjE2NDcwNjQ0Mzd9.4fgYpSViA0PBe9qyJbj3mg71_05xmq1xp_QA7_ipZoE';
  it('should have an index method', async () => {
    const result = await store.index();
    expect(result).toBeDefined();
  });
  it('should show an order', async () => {
    await request
      .get('/orders/1')
      .auth(token, { type: 'bearer' })
      .send(orderTest)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
      })
      .catch((error) => console.error(error.message));
  });
});

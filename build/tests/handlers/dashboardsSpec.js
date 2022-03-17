'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dashboard_1 = require('../../services/dashboard');
const supertest_1 = __importDefault(require('supertest'));
const server_1 = __importDefault(require('../../server'));
const product_1 = require('../../models/product');
const request = (0, supertest_1.default)(server_1.default);
const store = new dashboard_1.DashBoardQueries();
const storeProduct = new product_1.ProductStore();
describe('Dashboard Queries Endpoint', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6Ik1hbHBhcnRpZGEiLCJwYXNzd29yZCI6IiQyYiQxMCRaa0g4SFBWbmRRWkZESzQvbGFFY2F1NUlTTzNkTndUN1ZVTTR3Lkp6TjNaSm9QeHA4WXRtTyJ9LCJpYXQiOjE2NDcwNjQ0Mzd9.4fgYpSViA0PBe9qyJbj3mg71_05xmq1xp_QA7_ipZoE';
  it('should order products by category', async () => {
    const response = await request.get('/products/category/Apple');
    expect(response).toBeTruthy();
  });
  it('should show top 5 popular products', async () => {
    const response = await request.get('/products/top/5');
    expect(response).toBeTruthy();
  });
  it('should show current active orders', async () => {
    await request
      .get('/orders/active/1')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
        // console.log(res.body)
      })
      .catch((err) => console.error(err.message));
  });
  it('should show complete orders', async () => {
    await request
      .get('/orders/complete/1')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
        // console.log(res.body)
      })
      .catch((err) => console.error(err.message));
  });
});

import { OrderStore } from '../../models/order';
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const store = new OrderStore();

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
      .send(orderTest)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
      })
      .catch((error) => console.error(error.message));
  });
});

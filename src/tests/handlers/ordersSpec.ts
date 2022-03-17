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

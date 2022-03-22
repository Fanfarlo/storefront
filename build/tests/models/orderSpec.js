'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const order_1 = require('../../models/order');
const store = new order_1.OrderStore();
describe('Order Model Methods', () => {
  it('should have an index method', async () => {
    expect(store.index).toBeDefined();
    console.log(store.index);
  });
  it('should create an order', async () => {
    const order = await store.create({
      status: 'active',
      user_id: '3'
    });
    expect(order.id).toMatch('5');
  });
  it('should show an order by id', async () => {
    const order = await store.show('1');
    expect(order.id).toMatch('1');
  });
  it('should add a product to an order', async () => {
    const orderId = '1';
    const productId = '2';
    const quantity = 20;
    const order = await store.addProducts(orderId, productId, quantity);
    expect(order).toBeTruthy;
  });
});

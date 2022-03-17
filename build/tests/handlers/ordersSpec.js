"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const store = new order_1.OrderStore();
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

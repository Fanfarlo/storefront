"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model Methods', () => {
    it('should be defined an index method', async () => {
        expect(store.index).toBeDefined();
        console.log(store.index);
    });
    it('should show a product by id', async () => {
        const id = '2';
        const result = await store.show(id);
        expect(result).toBeTruthy();
        console.log(result);
    });
    it('should create a product', async () => {
        const product = {
            name: 'VIVO',
            price: 1200,
            category: 'Asus'
        };
        const result = await store.create(product);
        console.log(result);
        expect(result.price).toBeTruthy();
    });
});

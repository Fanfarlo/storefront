"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new order_1.OrderStore;
const index = async (req, res) => {
    const orders = await store.index();
    res.send(orders);
};
const show = async (req, res) => {
    const orders = await store.show(req.params.id);
    res.send(orders);
};
const create = async (req, res) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity,
        status: req.body.status,
        userId: req.body.userId
    };
    const newOrders = await store.create(order);
    res.send(newOrders);
};
const verifyAuthToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization || '';
        const token = authorizationHeader.split('')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || '');
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
};
exports.orderRoutes = orderRoutes;

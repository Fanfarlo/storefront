"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new order_1.OrderStore();
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.send(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const orders = await store.show(req.params.id);
        res.send(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id
    };
    try {
        const newOrders = await store.create(order);
        res.send(newOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const addProducts = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    try {
        const addedInfo = await store.addProducts(orderId, productId, quantity);
        res.send(addedInfo);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const verifyAuthToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization || ' ';
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || ' ');
        next();
    }
    catch (error) {
        res.status(401);
        res.json(`Invalid token ${error}`);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.post('/orders/:id/products', verifyAuthToken, addProducts);
};
exports.orderRoutes = orderRoutes;

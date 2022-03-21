"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const orders_1 = require("./handlers/orders");
const users_1 = require("./handlers/users");
const products_1 = require("./handlers/products");
const dashboards_1 = require("./handlers/dashboards");
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
(0, orders_1.orderRoutes)(app);
(0, users_1.userRoutes)(app);
(0, products_1.productRoutes)(app);
(0, dashboards_1.dashBoardRoutes)(app);
exports.default = app;

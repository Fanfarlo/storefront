"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var orders_1 = require("./handlers/orders");
var users_1 = require("./handlers/users");
var products_1 = require("./handlers/products");
var dashboards_1 = require("./handlers/dashboards");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3001';
app.use(body_parser_1["default"].json());
app.use(cors_1["default"]);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3001, function () {
    console.log("starting app on: ".concat(address));
});
(0, orders_1.orderRoutes)(app);
(0, users_1.userRoutes)(app);
(0, products_1.productRoutes)(app);
(0, dashboards_1.dashBoardRoutes)(app);
exports["default"] = app;

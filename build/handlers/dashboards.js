'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.dashBoardRoutes = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const dashboard_1 = require('../services/dashboard');
const dashboard = new dashboard_1.DashBoardQueries();
const productsByCategory = async (req, res) => {
  try {
    const products = await dashboard.productsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const productsTopFivePopular = async (req, res) => {
  try {
    const products = await dashboard.productsTopFivePopular(req.params.top);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const activeOrderByUser = async (req, res) => {
  try {
    const order = await dashboard.currentOrderByUser(req.params.userId);
    // console.log(order);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const completeOrderByUser = async (req, res) => {
  try {
    const orderComplete = await dashboard.completeOrderByUser(req.params.id);
    // console.log(order);
    res.json(orderComplete);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const verifyAuthToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization || ' ';
    const token = authorizationHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(
      token,
      process.env.TOKEN_SECRET || ' '
    );
    next();
  } catch (error) {
    res.status(401);
  }
};
const dashBoardRoutes = (app) => {
  app.get('/products/category/:category', productsByCategory);
  app.get('/products/top/:top', productsTopFivePopular);
  app.get('/orders/active/:userId', verifyAuthToken, activeOrderByUser);
  app.get('/complete/:id', verifyAuthToken, completeOrderByUser);
};
exports.dashBoardRoutes = dashBoardRoutes;

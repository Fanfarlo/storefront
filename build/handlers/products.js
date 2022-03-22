'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.productRoutes = void 0;
const product_1 = require('../models/product');
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const store = new product_1.ProductStore();
const index = async (req, res) => {
  try {
    const products = await store.index();
    res.send(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await store.show(id);
    res.send(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(401);
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
    res.json(`Invalid token ${error}`);
  }
};
const productRoutes = (app) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};
exports.productRoutes = productRoutes;

import express, { Response, Request, NextFunction } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';


const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.send(products);
  } catch (error) {
    res.status(400)
    res.json(error)
  }

};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.send(product);
  } catch (error) {
    res.status(400)
    res.json(error)
  }

};

const create = async (req: Request, res: Response) => {
  const product: Product = {
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

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization || ' ';
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || ' ');
    next();
  } catch (error) {
    res.status(401);
    res.json(`Invalid token ${error}`);
  }
};

export const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

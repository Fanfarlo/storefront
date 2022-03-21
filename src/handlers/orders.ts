import express, { Request, Response, NextFunction } from 'express';
import { Order, OrderStore } from '../models/order';
import jwt from 'jsonwebtoken';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.send(orders);
  } catch (error) {
    res.status(400)
    res.json(error)
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.show(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(400)
    res.json(error)
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  };
  try {
    const newOrders = await store.create(order);
    res.send(newOrders);
  } catch (error) {
    res.status(400)
    res.json(error)
  }

};

const addProducts = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedInfo = await store.addProducts(orderId, productId, quantity);
    res.send(addedInfo);
  } catch (err) {
    res.status(400);
    res.json(err);
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

export const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/:id/products', verifyAuthToken, addProducts);
};





import express, { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import jwt from 'jsonwebtoken';
import { DashBoardQueries } from '../services/dashboard';

const dashboard = new DashBoardQueries();

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await dashboard.productsByCategory(
      req.params.category
    );
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const productsTopFivePopular = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.productsTopFivePopular(req.params.top);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activeOrderByUser = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.currentOrderByUser(req.params.userId);
    // console.log(order);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const completeOrderByUser = async (req: Request, res: Response) => {
  try {
    const orderComplete = await dashboard.completeOrderByUser(req.params.id);
    // console.log(order);
    res.json(orderComplete);
  } catch (error) {
    res.status(400);
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
  }
};

export const dashBoardRoutes = (app: express.Application) => {
  app.get('/products/category/:category', productsByCategory);
  app.get('/products/top/:top', productsTopFivePopular);
  app.get('/orders/active/:userId', verifyAuthToken, activeOrderByUser);
  app.get('/complete/:id', verifyAuthToken, completeOrderByUser);
};

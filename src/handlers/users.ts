import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();
export const userRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/authenticate', authenticate);
};

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    throw new Error(`Cannot run index action. Error:${error}`);
  }
};
const destroy = async (req: Request, res: Response) => {
  const users: User = await store.delete(req.params.id);
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    throw new Error(`Cannot run show action. Error:${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET || '');
    console.log(newUser);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(`${error} + ${user}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.username,
    password: req.body.password
  };
  try {
    const auth = await store.authenticate(user.firstName, user.password);
    res.json(auth);
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
  }
};

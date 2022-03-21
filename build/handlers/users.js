"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const userRoutes = (app) => {
    app.post('/users', create);
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.delete('/users/:id', verifyAuthToken, destroy);
    app.post('/users/authenticate', authenticate);
};
exports.userRoutes = userRoutes;
const index = async (req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (error) {
        throw new Error(`Cannot run index action. Error:${error}`);
    }
};
const destroy = async (req, res) => {
    try {
        const users = await store.delete(req.params.id);
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (error) {
        throw new Error(`Cannot run show action. Error:${error}`);
    }
};
const create = async (req, res) => {
    const user = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET || '');
        console.log(newUser);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(`${error} + ${user}`);
    }
};
const authenticate = async (req, res) => {
    const user = {
        firstName: req.body.username,
        password: req.body.password
    };
    try {
        const auth = await store.authenticate(user.firstName, user.password);
        res.json(auth);
    }
    catch (error) {
        res.status(401);
        res.json(error);
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
    }
};

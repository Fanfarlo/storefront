import express, {Request, Response, NextFunction} from 'express'
import { Order, OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'

const store = new OrderStore

const index = async (req:Request, res:Response) => {
    const orders = await store.index()
    res.send(orders)
}

const show = async (req:Request, res:Response) => {
    const orders = await store.show(req.params.id)
    res.send(orders)
}

const create = async (req:Request, res:Response) => {

    const order:Order = {
        productId: req.body.productId,
        quantity: req.body.quantity,
        status: req.body.status,
        userId: req.body.userId
    }
    const newOrders = await store.create(order)
    res.send(newOrders)
}

const verifyAuthToken = async (req:Request, res:Response, next:NextFunction) => {
    
    try {
        const authorizationHeader = req.headers.authorization||''
        const token = authorizationHeader.split('')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET||'')
        next()
    } catch (error) {
        res.status(401)
    }
}
    export const orderRoutes = (app:express.Application) => {
    app.get('/orders',index);
    app.get('/orders/:id',show);
    app.post('/orders', create)
}
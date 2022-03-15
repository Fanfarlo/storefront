import express, {Request, Response, NextFunction} from 'express'
import { Product } from '../models/product'
import jwt from 'jsonwebtoken'
import { DashBoardQueries } from '../services/dashboard'

const dashboard = new DashBoardQueries()

const productsByCategory = async (req:Request, res:Response) => {
    const products:Product[] = await dashboard.productsByCategory(req.params.category)
    res.json(products)
}

const productsTopFivePopular = async (req:Request, res:Response) => {
    const products = await dashboard.productsTopFivePopular(req.params.top)
    res.json(products)
}

const activeOrderByUser = async (req:Request, res:Response) => {
    const order = await dashboard.currentOrderByUser(req.params.userId)
    console.log(order);
    res.json(order)
}

const completeOrderByUser = async (req:Request, res:Response) => {
    const order = await dashboard.completeOrderByUser(req.params.userId)
    console.log(order);
    res.json(order)
}

const verifyAuthToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization||' '
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET||' ')
        next()
    } catch (error) {
        res.status(401)
    }

} 



export const dashBoardRoutes = (app: express.Application) => {
    app.get('/products/category/:category', productsByCategory)
    app.get('/products/top/:top', productsTopFivePopular) 
    app.get('/orders/active/:userId', verifyAuthToken, activeOrderByUser)
    app.get('/orders/complete/:userId', verifyAuthToken, completeOrderByUser)
}
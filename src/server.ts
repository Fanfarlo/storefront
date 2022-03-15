import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { orderRoutes } from './handlers/orders'
import { userRoutes } from './handlers/users'
import { productRoutes } from './handlers/products'
import { dashBoardRoutes } from './handlers/dashboards'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

orderRoutes(app)
userRoutes(app)
productRoutes(app)
dashBoardRoutes(app)
console.log(orderRoutes)
export default app
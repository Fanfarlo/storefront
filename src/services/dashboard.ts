import client from "../database";
import { Order } from "../models/order";
import { Product } from "../models/product";

export class DashBoardQueries {

    async productsByCategory(category:string):Promise<Product[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE category=$1'
            const result = await conn.query(sql,[category])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error (`Unable to get products by category:${error}`)
        }
    }

    async productsTopFivePopular(top:string):Promise<Product[]>{

        try {
            const conn = await client.connect()
            const sql = 'SELECT name, category, price, quantity FROM products INNER JOIN orders ON products.id = orders.product_id ORDER BY quantity DESC LIMIT $1;'
            const result = await conn.query(sql, [top])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error (`Cannot get action run ${error}`)
        }

    }

    async currentOrderByUser(userId:string):Promise<Order[]>{
        try {
            const conn = await client.connect()
            const sql = "SELECT name, quantity, price, status FROM orders INNER JOIN products ON orders.product_id=products.id WHERE orders.user_id=($1) AND orders.status='active';"
            const result = await conn.query(sql,[userId])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error (`Cannot get action to run. Error ${error} `)
        }
    }

    async completeOrderByUser(userId:string):Promise<Order[]>{
        try {
            const conn = await client.connect()
            const sql = "SELECT name, quantity, price, status FROM orders INNER JOIN products ON orders.product_id=products.id WHERE orders.user_id=($1) AND orders.status='complete';"
            const result = await conn.query(sql,[userId])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error (`Cannot get action to run. Error ${error} `)
        }
    }
}

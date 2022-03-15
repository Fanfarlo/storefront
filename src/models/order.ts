import client from '../database'

export type Order = {
    id?: string,
    productId?: string,
    quantity?: number,
    userId?: string,
    status?: string
}

export class OrderStore {
    async index():Promise<Order[]>{
        try {
            const conn = await client.connect() 
            const sql = 'SELECT * FROM orders'    
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error (`Cannot run index action. Error:${error}`)
        }

    }

    async show(id:string):Promise<Order>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error (`Cannot run show action. Error:${error}`)
        }
    }

    async create(o:Order):Promise<Order>{
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1,$2,$3,$4) RETURNING *;'
            const result = await conn.query(sql, [o.productId, o.quantity, o.userId, o.status])
            conn.release
            return result.rows[0]
        } catch (error) {
            throw new Error (`Cannot run create action. Error:${error}`)
        }
    }
}

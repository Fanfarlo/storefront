import client from '../database'

export type Product = {
    id?: string,
    name?: string,
    price?: number,
    category: string
}

export class ProductStore {

    async index():Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release
            return result.rows
        } catch (error) {
            throw new Error (`Cannot run action index, Error:${error}`)
        }
    }

    async create(p:Product):Promise<Product>{
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql,[p.name, p.price, p.category])
            conn.release
            return result.rows[0]
        } catch (error) {
            throw new Error (`Cannot run create action, Error:${error}`)
        }

    }
    
    async show(id:string):Promise<Product> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release
            return result.rows[0]
        } catch (error) {
            throw new Error (`Cannot run show action, Error:${error}`)
        }
    }
}

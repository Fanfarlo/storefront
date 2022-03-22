import client from '../database';

export type Order = {
  id?: string;
  status: string;
  user_id: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot run index action. Error:${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot run show action. Error:${error}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot run create action. Error:${error}`);
    }
  }

  async addProducts(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<Order> {

    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;';
      const result = await conn.query(sql, [orderId, productId, quantity]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${error}`
      );
    }
  }
}

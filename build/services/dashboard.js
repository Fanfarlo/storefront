'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DashBoardQueries = void 0;
const database_1 = __importDefault(require('../database'));
class DashBoardQueries {
  async productsByCategory(category) {
    try {
      const conn = await database_1.default.connect();
      const sql = 'SELECT * FROM products WHERE category=$1';
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get products by category:${error}`);
    }
  }
  async productsTopFivePopular(top) {
    try {
      const conn = await database_1.default.connect();
      const sql =
        'SELECT name, category, price, quantity FROM products INNER JOIN order_products ON products.id = order_products.product_id ORDER BY quantity DESC LIMIT $1;';
      const result = await conn.query(sql, [top]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get action run ${error}`);
    }
  }
  async currentOrderByUser(userId) {
    try {
      const conn = await database_1.default.connect();
      const sql =
        "SELECT product_id, quantity, status FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE orders.user_id=($1) AND orders.status='active';";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get action to run. Error ${error} `);
    }
  }
  async completeOrderByUser(id) {
    try {
      const conn = await database_1.default.connect();
      const sql =
        "SELECT product_id, quantity, status FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE orders.user_id=($1) AND orders.status='complete';";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get action to run. Error ${error} `);
    }
  }
}
exports.DashBoardQueries = DashBoardQueries;

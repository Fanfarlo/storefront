import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

const request = supertest(app);

describe('Dashboard Queries Endpoint', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6Ik1hbHBhcnRpZGEiLCJwYXNzd29yZCI6IiQyYiQxMCRaa0g4SFBWbmRRWkZESzQvbGFFY2F1NUlTTzNkTndUN1ZVTTR3Lkp6TjNaSm9QeHA4WXRtTyJ9LCJpYXQiOjE2NDcwNjQ0Mzd9.4fgYpSViA0PBe9qyJbj3mg71_05xmq1xp_QA7_ipZoE';
  
    beforeAll(async () =>{
      const conn = await client.connect()
      await conn.query("INSERT INTO users (firstname, lastname, password) VALUES ('user1', 'last', 'hola');")
      await conn.query("INSERT INTO users (firstname, lastname, password) VALUES ('user2', 'last', 'hola');")
      await conn.query("INSERT INTO users (firstname, lastname, password) VALUES ('user3', 'last', 'hola');")
      await conn.query("INSERT INTO products (name, price, category) VALUES ('RP-15', 1500, 'Eluktronics') RETURNING *;")
      await conn.query("INSERT INTO products (name, price, category) VALUES ('Legion5', 1600, 'LENOVO') RETURNING *;")
      await conn.query("INSERT INTO products (name, price, category) VALUES ('TUF', 2300, 'ASUS') RETURNING *;")
      await conn.query("INSERT INTO products (name, price, category) VALUES ('ALIENWARE', 3000, 'DELL') RETURNING *;")
      await conn.query("INSERT INTO products (name, price, category) VALUES ('Vivobook', 1800, 'ASUS') RETURNING *;")
      await conn.query("INSERT INTO orders (status, user_id) VALUES ('active', '1') RETURNING *;")
      await conn.query("INSERT INTO orders (status, user_id) VALUES ('complete', '2') RETURNING *;")
      await conn.query("INSERT INTO orders (status, user_id) VALUES ('complete', '3') RETURNING *;")
      await conn.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES ('1', '1', '10') RETURNING *;")
      await conn.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES ('2', '2', '22') RETURNING *;")
      await conn.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES ('3', '3', '15') RETURNING *;")
      await conn.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES ('3', '4', '30') RETURNING *;")
      await conn.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES ('3', '5', '25') RETURNING *;")
    })

  it('should show products order by category ASUS', async () => {


    await request.get('/products/category/ASUS')
   .expect(200)
   .then(res => {
     expect(res.body).toBeTruthy()
     console.log(res.body)
   })
   .catch((error) => {
      throw new Error (`Test fail. Cannot show products order by category. Error: ${error}`)
   })
  });

  it('should show top 5 popular products', async () => {

      await request.get('/products/top/5')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeTruthy()
        console.log(res.body)
      })
      .catch((error) => {
        throw new Error (`Tes fail. Cannot show 5 most popular products. Error:${error}`)
      })
  });

  it('should show current active order by user id', async () => {
    await request
      .get('/orders/active/1')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
        console.log(res.body)
      })
      .catch((err) => console.error(err.message));
  });

  it('should show complete orders by user id', async () => {
    await request
      .get('/orders/complete/3')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy;
        console.log(res.body)
      })
      .catch((err) => console.error(err.message));
  });

});

## RESTful Routes

#### Products

- Index route: '/products'[GET]
- Show route: '/products/:id'[GET]
- Create route[token required]: '/products'[POST]

#### Users

- Index route[token required]: '/users' [GET]
- Show route[token required]: '/users/:id'[GET]
- Create route[token required]: '/users'[POST]
- Authentication route: '/users/authenticate'[POST]
- Delete route[token required]: '/users/:id'[DELETE]

#### Orders

- Index route: '/orders' [GET]
- Show route: '/orders/:id' [GET]
- Create route: '/orders'[POST]

#### Dashboard

- Top Products route:'/products/top/:top'[GET]
  **Example** '/products/top/5'

- Products by Category route:'/products/category/:category'[GET]
  **Example** '/products/category/Apple'

- User currently orders route: '/orders/active/:userId'[GET]
  **Example** '/orders/active/1'

- User completed orders route: '/orders/complete/:userId'[GET]
  **Example** '/orders/complete/2'

## Database Structure

#### Orders

- Table:
  orders (id: SERIAL PRIMARY KEY, user_id: string [foreign key to table users(id)], status: varchar [active or complete])

#### Users

- Table:
  users (id: SERIAL PRIMARY KEY, firstname: varchar, lastname: varchar, password: string)

#### Products

- Table:
  products (id: SERIAL PRIMARY KEY, name: varchar, price: integer, category: varchar)

#### order-products

- Table:
  order_products (id: SERIAL PRIMARY KEY, product_id: [foreign key to table products(id)], order_id: [foreign key to table orders(id)], quantity: integer)

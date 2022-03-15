# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show  
- Create [token required] 
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] 
- Show [token required] 
- Create [token required] 

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category 

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

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

- User completed orders route: '/orders/completed/:user_id'[GET]

#### Dashboard
- Top Products route:'/products/top/:top'[GET]
**Example** '/products/top/5'

- Products by Category route:'/products/category/:category'[GET]
**Example** '/products/category/Apple'

- User active order route: '/orders/active/:userId'[GET]
**Example** '/orders/active/:userId'

- User complete order route: '/orders/complete/:userId'[GET]
**Example** '/orders/complete/:userId'

## Database Structure
#### Orders
- Table: orders (id: SERIAL PRIMARY KEY, product_id: string [foreign key to table products(id)], quantity: integer, user_id: string [foreign key to table users(id)], status: varchar)

#### Users
- Table users (id: SERIAL PRIMARY KEY, firstname: varchar, lastname: varchar, password: string)

#### Products
- Table products (id: SERIAL PRIMARY KEY, name: varchar, price: integer, category: varchar)

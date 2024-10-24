
    Inventory Management System

This is an API-based inventory management system built with Node.js, Express, and PostgreSQL. It provides CRUD operations, pagination, product filtering, and event logging.

       Features

. Product management (Create, Read, Update, Delete).
. Pagination for large datasets.
. Filter products by category or quantity range.
. Event logging for product additions, updates, and deletions.

      Installation: 

1. Clone the repository: git clone https://github.com/sabinn12/inventory-management-system.git
2. install dependincies: npm install
3. Configure environment: Create a .env file with your database credentials:
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=inventory_db
   
      Run the Server
. npm run dev
    
       API Endpoints

  .POST /products
Create a new product.

  .PATCH /products/:id
Update an existing product by its ID.

  .DELETE /products/:id
Delete a product by its ID.

  .GET /products
Get all products.
GET /products/:id

Get a specific product by its ID.
GET /products/filter/category

Filter products by category.
GET /products/filter/quantity

Filter products by quantity range.
GET /event-logs

Retrieve all event logs.
GET /products/paginated

Get products with pagination.




